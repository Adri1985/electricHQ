const btn = document.getElementById('button');

document.getElementById('contactForm')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_uj9oa8k';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      Swal.fire(
        "Email sent! you will receive a copy in your email adress");
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});