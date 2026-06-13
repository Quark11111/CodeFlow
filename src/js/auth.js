import { db } from './firebase.js'
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js"


const auth = getAuth()
const form = document.getElementById('login-form')

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            window.location.href = '/admin/dashboard.html'
        } catch (error) {
            alert('Ошибка входа: ' + error.message)
        }
    })
}

export const logout = async () => {
    try {
        await signOut(auth)
        window.location.href = '/admin/index.html'
    } catch (error) {
        console.error('Ошибка выхода:', error)
    }
}