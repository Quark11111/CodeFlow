import { db } from './firebase.js'
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js"
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js"

const auth = getAuth()

const fetchRequests = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'requests'))
        const table = document.getElementById('requests-table')

        if (!table) {
            console.error('Таблица не найдена')
            return
        }

        querySnapshot.forEach(doc => {
            const data = doc.data()
            
            let dateStr = 'N/A'
            if (data.timestamp && data.timestamp.seconds) {
                dateStr = new Date(data.timestamp.seconds * 1000).toLocaleDateString('ru-RU')
            } else if (data.timestamp instanceof Date) {
                dateStr = data.timestamp.toLocaleDateString('ru-RU')
            } else if (typeof data.timestamp === 'number') {
                dateStr = new Date(data.timestamp).toLocaleDateString('ru-RU')
            }
            
            table.innerHTML += `
                <tr>
                    <td>${data.name || 'N/A'}</td>
                    <td>${data.email || 'N/A'}</td>
                    <td>${data.phone || 'N/A'}</td>
                    <td>${data.message || 'N/A'}</td>
                    <td>${dateStr}</td>
                </tr>
            `
        })
    } catch (error) {
        console.error('Ошибка загрузки заявок:', error)
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Авторизован как:', user.email)
        fetchRequests()
    } else {
        console.log('Не авторизован, редирект...')
        window.location.href = '/admin/index.html'
    }
})

// Функция логаута
window.logout = async () => {
    try {
        await signOut(auth)
        window.location.href = '/admin/index.html'
    } catch (error) {
        console.error('Ошибка выхода:', error)
    }
}