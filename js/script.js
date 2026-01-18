// Activer le lien de navigation actif selon la page actuelle
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

if (document.getElementById('quiz-form')) {
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    const correctAnswers = {
        q1: 'b', q2: 'c', q3: 'a', q4: 'b', q5: 'b',
        q6: 'b', q7: 'a', q8: 'a', q9: 'b', q10: 'd',
        q11: 'b', q12: 'b', q13: 'b', q14: 'b', q15: 'b'
    };

    const answerLabels = {
        q1: { b: '<a>' },
        q2: { c: 'color' },
        q3: { a: 'getElementById()' },
        q4: { b: '<header>' },
        q5: { b: '.test { }' },
        q6: { b: 'margin' },
        q7: { a: 'alert()' },
        q8: { a: '<table>' },
        q9: { b: 'justify-content' },
        q10: { d: 'Toutes les réponses' },
        q11: { b: '<footer>' },
        q12: { b: '<link rel="stylesheet" href="style.css">' },
        q13: { b: 'onclick' },
        q14: { b: 'grid-template-columns' },
        q15: { b: 'push()' }
    };

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;
        
        for (let question in correctAnswers) {
            const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
            if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
                score++;
            }
        }
        
        const percentage = (score / totalQuestions) * 100;
        
        let alertClass = 'alert-danger';
        let iconClass = 'bi-x-circle-fill';
        let message = 'Continuez à étudier !';
        
        if (percentage >= 80) {
            alertClass = 'alert-success';
            iconClass = 'bi-check-circle-fill';
            message = 'Excellent travail !';
        } else if (percentage >= 60) {
            alertClass = 'alert-warning';
            iconClass = 'bi-exclamation-triangle-fill';
            message = 'Bon résultat, encore un petit effort !';
        }
        
        let correctAnswersList = '<div class="mt-4"><h4><i class="bi bi-list-check"></i> Réponses correctes :</h4><ol class="list-group list-group-numbered">';
        let questionNumber = 1;
        for (let question in correctAnswers) {
            const correctAnswer = correctAnswers[question];
            const answerText = answerLabels[question][correctAnswer];
            correctAnswersList += `<li class="list-group-item">Question ${questionNumber}: ${answerText}</li>`;
            questionNumber++;
        }
        correctAnswersList += '</ol></div>';
        
        quizResult.className = `alert ${alertClass} show`;
        quizResult.innerHTML = `
            <h3><i class="${iconClass}"></i> ${message}</h3>
            <p class="fs-4 mb-3">
                Votre score : <strong>${score}/${totalQuestions}</strong> (${percentage.toFixed(0)}%)
            </p>
            ${correctAnswersList}
        `;
        
        quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// Script pour le formulaire de contact (uniquement sur la page contact.html)
if (document.getElementById('contact-form')) {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const sujet = document.getElementById('sujet').value;
        const message = document.getElementById('message').value;
        
        const mailtoLink = `mailto:samarjbili02@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent('Nom: ' + nom + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
        
        window.location.href = mailtoLink;
        
        alert('Merci pour votre message ! Votre client email va s\'ouvrir.');
        contactForm.reset();
    });
}