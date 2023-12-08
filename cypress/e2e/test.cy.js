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

describe('Upload song in AudioFlow', () => {
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
        cy.wait(5000)
    })

    it('Try to create a playlist', () => {
        cy.contains('Crear nueva Playlist').click()
        cy.get('[placeholder="Música favorita"]').type('Playlist test')
        cy.contains('Crear Playlist').click()
    })

    it('Try to add a song to playlist', () => {
        cy.contains('cypress').click()
        cy.contains('Mi perfil').click()
        cy.get('#songOptions').click()
        cy.wait(2000)
        cy.contains('Agregar a la playlist').click()
        cy.contains('Agregar a Playlist').click()
    })

    it('Try to remove a song to playlist', () => {
        cy.contains('Playlist test').click()
        cy.get('#songOptions').click()
        cy.contains('Eliminar de la playlist').click()
        cy.contains('Eliminar').click()
    })

    it('Try to delete a playlist', () => {
        cy.contains('Playlist test').click()
        cy.get('#deletePlaylist').click()
        cy.contains('Eliminar').click()
    })
})

/*
describe('Playlist user flow in AudioFlow', () => {
    beforeEach( () => {
        cy.visit('http://localhost:5173')
        cy.contains('Usuario Invitado').click()
        cy.contains('Iniciar sesión').click()
        cy.get('[placeholder="ejemplo@correo"]').type('cypress@test.cy')
        cy.get('[placeholder="contraseña"]').type('cypresspassword')
        cy.contains('Iniciar sesión').click()
    })

    
    
})

describe('Delete song in AudioFlow', () => {
    beforeEach( () => {
        cy.visit('http://localhost:5173')
        cy.contains('Usuario Invitado').click()
        cy.contains('Iniciar sesión').click()
        cy.get('[placeholder="ejemplo@correo"]').type('cypress@test.cy')
        cy.get('[placeholder="contraseña"]').type('cypresspassword')
        cy.contains('Iniciar sesión').click()
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
*/