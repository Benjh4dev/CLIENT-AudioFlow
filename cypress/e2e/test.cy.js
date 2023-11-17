describe('Get AudioFlow Songs', () => {
    it('Get all songs', () => {
        cy.intercept('GET', 'http://localhost:3002/api/song').as('getSongs')
        cy.visit('http://localhost:5173')
        cy.wait('@getSongs')
    })
})

describe('Login user in AudioFlow', () => {
    beforeEach( () => {
        cy.visit('http://localhost:5173')
        cy.contains('Usuario Invitado').click()
        cy.contains('Iniciar sesión').click()
    })

    it('Try to login a test user with empty credentials.', () => {
        cy.contains('Iniciar sesión').click()
        cy.contains('Ingrese los campos correctamente')
    })

    it('Try to login a test user with wrong format.', () => {
        cy.get('[placeholder="ejemplo@correo"]').type('a')
        cy.get('[placeholder="contraseña"]').type('a')
        cy.contains('Iniciar sesión').click()
        cy.contains('Ingrese los campos correctamente')
    })

    it('Try to login a test user with wrong password.', () => {
        cy.get('[placeholder="ejemplo@correo"]').type('cypressg@test.cy')
        cy.get('[placeholder="contraseña"]').type('wrongpassword')
        cy.contains('Iniciar sesión').click()
        cy.contains('Credenciales inválidas')
    })

    it('Try to login a test user with wrong email.', () => {
        cy.get('[placeholder="ejemplo@correo"]').type('cypresswrong@test.cy')
        cy.get('[placeholder="contraseña"]').type('cypresspassword')
        cy.contains('Iniciar sesión').click()
        cy.contains('Credenciales inválidas')
    })
    it('Try to login a test user with correct credentials.', () => {
        cy.intercept('POST', 'http://localhost:3002/api/auth').as('loginUser')
        cy.get('[placeholder="ejemplo@correo"]').type('cypress@test.cy')
        cy.get('[placeholder="contraseña"]').type('cypresspassword')
        cy.contains('Iniciar sesión').click()
        cy.wait('@loginUser')
    })
})

describe('Upload and delete song in AudioFlow', () => {
    beforeEach( () => {
        cy.visit('http://localhost:5173')
        cy.contains('Usuario Invitado').click()
        cy.contains('Iniciar sesión').click()
        cy.get('[placeholder="ejemplo@correo"]').type('cypress@test.cy')
        cy.get('[placeholder="contraseña"]').type('cypresspassword')
        cy.contains('Iniciar sesión').click()
    })

    it('Try to upload a song', () => {
        cy.intercept('POST', 'http://localhost:3002/api/song/X7hFZhHcL7v6Auxjz0iQ').as('uploadSong')
        cy.contains('Subir Canción').click()
        cy.get('[placeholder="Thriller"]').type('Ateraxia')
        cy.get('[placeholder="Michael Jackson"]').type('Diaries of a Hero')
        cy.get('#song_file').attachFile('Ateraxia.mp3')
        cy.get('#cover_art').attachFile('DiariesOfAHero.png')
        cy.contains('Subir canción').click()
        cy.wait('@uploadSong')
    })

    it('Try to delete the song', () => {
        cy.contains('cypress').click()
        cy.contains('Mi perfil').click()
        cy.get('#songOptions').click()
        cy.contains('Eliminar canción').click()
        cy.contains('Eliminar').click()
        cy.wait(5000)
    })
})