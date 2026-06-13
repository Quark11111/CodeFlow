import { db, addDoc } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const fetchCourses = async () => {
    const querySnapshot = await getDocs(collection(db, 'course'))
    const coursesContainer = document.querySelector('.course')

    querySnapshot.forEach(doc => {
        const data = doc.data()
        
        coursesContainer.innerHTML += `
            <div class="course__card">
                <div class="course__card-name">${data.name}</div>
                <div class="course__card-title">${data.title}</div>
            </div>
        `
    })
}

fetchCourses()

const fetchTeachers = async () => {
    const querySnapshot = await getDocs(collection(db, 'teacher'))
    const coursesContainer = document.querySelector('.teacher')

    querySnapshot.forEach(doc => {
        const data = doc.data()
        
        coursesContainer.innerHTML += `
            <div class="teacher__card">
                <img class="teacher__card-img" src=${data.imgUrl}>
                <div class="teacher__card-name">${data.name}</div>
                <div class="teacher__card-role">${data.role}</div>
                <div class="teacher__card-title">${data.title}</div>
            </div>
        `
    })
}

fetchTeachers()

const fetchPrices = async () => {
    const querySnapshot = await getDocs(collection(db, 'price'))
    const coursesContainer = document.querySelector('.price')

    querySnapshot.forEach(doc => {
        const data = doc.data()
        
        coursesContainer.innerHTML += `
            <div class="price__card">
            <div class="price__card-duration">${data.duration}</div>
                <div class="price__card-name">${data.name}</div>
                <div class="price__card-description">${data.description}</div>
                <div class="price__card-price">${data.price}₸</div>
            </div>
        `
    })
}

fetchPrices()


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    })
})


const fetchReviews = async () => {
    const querySnapshot = await getDocs(collection(db, 'review'))
    const reviewsContainer = document.querySelector('.review')

    querySnapshot.forEach(doc => {
        const data = doc.data()
        const stars = '⭐'.repeat(data.rating)
        
        reviewsContainer.innerHTML += `
            <div class="review__card">
                <div class="review__stars">${stars}</div>
                <div class="review__text">${data.text}</div>
                <div class="review__author">${data.name}, ${data.age} лет</div>
            </div>
        `
    })
}

fetchReviews()

const fetchFaq = async () => {
    const querySnapshot = await getDocs(collection(db, 'faq'))
    const coursesContainer = document.querySelector('.FaQ')

    querySnapshot.forEach(doc => {
        const data = doc.data()
        
        coursesContainer.innerHTML += `
            <div class="faq__card">
                <div class="faq__card-question">${data.question}</div>
                <div class="faq__card-answer">${data.answer}</div>
            </div>
        `
    })
}

fetchFaq()

const form = document.querySelector('.form__input')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const phone = document.getElementById('phone').value
    const message = document.getElementById('message').value

    try {
        await addDoc(collection(db, 'requests'), {
            name,
            email,
            phone,
            message,
            timestamp: new Date()
        })
        alert('Спасибо! Мы скоро свяжемся с вами')
        form.reset()
    } catch (error) {
        console.error('Ошибка:', error)
    }
})

const navToggle = document.querySelector('.nav-toggle')
const navMenu = document.getElementById('nav-menu')

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active')
})

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active')
    })
})