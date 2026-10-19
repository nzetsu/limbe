const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); ro.unobserve(entry.target); }
}), {threshold: .1});
reveals.forEach(el => ro.observe(el));
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 70));
const mobile = document.getElementById('mobileCTA');
const interest = document.getElementById('interest');
new IntersectionObserver(entries => entries.forEach(entry => {
  mobile.classList.toggle('hide', entry.isIntersecting);
}), {threshold: .15}).observe(interest);

const form = document.getElementById('interestForm');
const statusBox = document.getElementById('success');
const submitButton = form.querySelector('button[type="submit"],button');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const endpoint = form.action;
  if (endpoint.includes('DEINE_FORM_ID')) {
    statusBox.textContent = 'Bitte zuerst deine Formspree-Formular-ID in index.html eintragen. Es wurden keine Daten gesendet.';
    statusBox.classList.add('show');
    return;
  }
  submitButton.disabled = true;
  const oldContent = submitButton.innerHTML;
  submitButton.textContent = 'WIRD GESENDET …';
  statusBox.classList.remove('show');
  try {
    const response = await fetch(endpoint, {
      method: 'POST', body: new FormData(form), headers: {'Accept': 'application/json'}
    });
    if (!response.ok) throw new Error('Submission failed');
    form.reset();
    statusBox.textContent = '✓ Danke! Dein Interesse wurde übermittelt. Wir melden uns mit möglichen Terminen.';
    statusBox.classList.add('show');
  } catch (error) {
    statusBox.textContent = 'Die Übermittlung hat leider nicht funktioniert. Bitte versuche es erneut.';
    statusBox.classList.add('show');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = oldContent;
    statusBox.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  }
});
