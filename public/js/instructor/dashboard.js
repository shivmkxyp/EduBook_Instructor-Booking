let currentFilter = 'upcoming';

function setFilter(filter) {
  currentFilter = filter;
  document.getElementById('tab-upcoming').className = filter === 'upcoming' ? 'btn btn-outline tab-active' : 'btn btn-outline tab-inactive';
  document.getElementById('tab-history').className = filter === 'history' ? 'btn btn-outline tab-active' : 'btn btn-outline tab-inactive';
  loadBookings();
}

async function loadBookings() {
  const token = localStorage.getItem('token');
  if(!token) return window.location.href = '/login';

  const res = await fetch('/api/booking', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const bookings = await res.json();
  const container = document.getElementById('bookingsList');
  container.innerHTML = '';
  
  if (!Array.isArray(bookings)) {
    let errorMsg = bookings.message || 'Unknown error';
    if (errorMsg.includes('timed out') || errorMsg.includes('buffering') || errorMsg.includes('timeout') || errorMsg.includes('bufferCommands')) {
       errorMsg = 'Database connection failed. Please ensure MONGO_URI is set in your AI Studio secrets and the database is seeded.';
    }
    container.innerHTML = `<p class="error-message">Failed to load bookings: ${errorMsg}</p>`;
    return;
  }

  const filteredBookings = bookings.filter(b => {
    if (currentFilter === 'upcoming') {
      return b.status === 'confirmed' || b.status === 'pending';
    } else {
      return b.status === 'completed' || b.status === 'cancelled';
    }
  });

  if (filteredBookings.length === 0) {
    container.innerHTML = '<p>No bookings found.</p>';
    return;
  }

  filteredBookings.forEach(b => {
    const div = document.createElement('div');
    div.className = 'card card-flex';
    let actionsHTML = '';
    if (b.status === 'confirmed') {
      actionsHTML = `
        <div class="booking-actions">
          <button onclick="updateStatus('${b._id}', 'completed')" class="btn btn-primary btn-success btn-sm flex-1">Mark Complete</button>
          <button onclick="updateStatus('${b._id}', 'cancelled')" class="btn btn-outline btn-danger btn-sm flex-1">Cancel</button>
        </div>
      `;
    }
    
    let badgeClass = b.status === "completed" ? "badge-success" : b.status === "cancelled" ? "badge-danger" : b.status === "pending" ? "badge-warning" : b.status === "confirmed" ? "badge-success" : "badge-info";

    let studentContactInfo = '';
    const phoneHash = (b.studentId?._id || '0987654321').toString().substring(0, 10);
    const fakePhone = '+91 ' + phoneHash.replace(/\D/g, '0').padEnd(10, '0');
    studentContactInfo = `
      <div class="contact-info">
        <p class="contact-item">
          <svg class="contact-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          ${b.studentId?.email || 'N/A'}
        </p>
        <p class="contact-item">
          <svg class="contact-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          ${fakePhone}
        </p>
      </div>
    `;
    const mode = b.availabilityId?.mode || 'Online';
    div.innerHTML = `
      <h3>${b.service}</h3>
      <p><strong>Student:</strong> ${b.studentId?.name || 'Unknown'}</p>
      <p><strong>Date:</strong> ${b.availabilityId?.date || 'N/A'}</p>
      <p><strong>Time:</strong> ${b.availabilityId?.startTime || ''} - ${b.availabilityId?.endTime || ''}</p>
      <p><strong>Mode:</strong> ${mode === 'Both' ? 'Online' : mode}</p>
      <span class="badge ${badgeClass}">${b.status}</span>
      ${studentContactInfo}
      ${actionsHTML}
    `;
    container.appendChild(div);
  });
}

async function updateStatus(bookingId, status) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`/api/booking/${bookingId}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ status })
    });
    
    if (res.ok) {
      loadBookings();
    } else {
      const data = await res.json();
      alert(data.message || 'Error updating status');
    }
  } catch (error) {
    alert('An error occurred');
  }
}

document.addEventListener('DOMContentLoaded', loadBookings);
