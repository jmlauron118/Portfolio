function scrollTo(element, to) {
    element.scrollTop = to;
}

const typedElements = document.querySelector('.typed');
const items = typedElements.dataset.typedItems;
const words = items.split(',');
const typingSpeed = 100;
const erasingSpeed = 20;
const delayBetweenWords = 1000;
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {

    const currentWork = words[wordIndex];

    if(!isDeleting) {
        typedElements.textContent = currentWork.substring(0, charIndex + 1);
        charIndex++;

        if(charIndex === currentWork.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenWords);
        }
        else{
            setTimeout(type, typingSpeed);
        }
    }
    else {
        typedElements.textContent = currentWork.substring(0, charIndex - 1);
        charIndex--;

        if(charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, typingSpeed);
        }   
        else {
            setTimeout(type, erasingSpeed);
        }
    }
}

function sendEmail () {
    const formatter = new Intl.DateTimeFormat("en-US", {
	  year: "numeric",
	  month: "2-digit",
	  day: "2-digit",
	  hour: "2-digit",
	  minute: "2-digit",
	  second: "2-digit",
	  hour12: true
	});

    emailjs.init({
	  publicKey: "8j8VIzNdhTI08741d"
	});

    document.getElementById('sendEmail').addEventListener('click', (e) => {
        e.preventDefault();
        
        let errorMessage = "";
        const email = document.getElementById('email').value.trim();
        const name = document.getElementById('name').value.trim();
        const subject =  document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const emailForm = document.getElementById("emailForm");
        
        if (email == "" || name == "" || subject == "" || message == "") {
            errorMessage = "Please fill all the fields!"
            flashMessage("display-message", "error-message", errorMessage, 3000);
            return;
        }
        
        if (!isValidEmail(email)) {
            errorMessage = "Please input a valid email!"
            flashMessage("display-message", "error-message", errorMessage, 3000);
            return;
        }

        const templateParams = {
            email: email,
            name: name,
            subject: subject,
            message: message,
            datetime: formatter.format(new Date())
        };

        emailjs.send('service_d69dbc21-1a7f', 'template_8rcv27h', templateParams)
        .then(() => {
            flashMessage("display-message", "sent-message", "Your email has been sent!", 3000);
        }, 
        (err) => {
            flashMessage("display-message", "error-message", JSON.stringify(err), 3000);
        });

        emailForm.reset();
    });
}

function isValidEmail(email) {
    const regex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function flashMessage(id, elClass, message, duration = 1000) {
    const el = document.getElementById(id);

    el.textContent = message;
    el.classList.add("show", elClass);

    setTimeout(() => {
        el.textContent = "";
        el.classList.remove("show", elClass);
    }, duration);
}