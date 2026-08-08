async function loadProfile() {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/instructor/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const profile = await res.json();
  if (profile) {
    document.getElementById('bio').value = profile.bio || '';
    document.getElementById('experience').value = profile.experience || '';
    document.getElementById('languages').value = (profile.languages || []).join(', ');
  }
}

document.getElementById('profileForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  
  const bio = document.getElementById('bio').value;
  const experience = document.getElementById('experience').value;
  const languages = document.getElementById('languages').value.split(',').map(s => s.trim());

  const res = await fetch('/api/instructor/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ bio, experience, languages })
  });

  if (res.ok) alert('Profile updated!');
});

document.addEventListener('DOMContentLoaded', loadProfile);
