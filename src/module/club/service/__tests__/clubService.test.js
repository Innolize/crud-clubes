const Club = require('../../entity/Club')
const ClubService = require('../clubService')
const ClubNotDefinedError = require('../error/clubNotDefinedError')
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError')


const repositoryMock = {
    getData: jest.fn(),
    getByID: jest.fn(),
    saveTeam: jest.fn(),
    deleteTeam: jest.fn(),
    editTeam: jest.fn()
}

const service = new ClubService(repositoryMock)

test('Guardar un equipo llama al methodo saveTeam del repositorio 1 vez', () => {
    service.saveTeam({})
    expect(repositoryMock.saveTeam).toHaveBeenCalledTimes(1)
})

test('getData llama al metodo getData del repositorio 1 vez', () => {
    service.getData()
    expect(repositoryMock.getData).toHaveBeenCalledTimes(1)
})


test("getByID llama al metodo getByID del repositorio 1 vez", () => {
    service.getByID(1)
    expect(repositoryMock.getByID).toHaveBeenCalledTimes(1)
    expect(repositoryMock.getByID).toHaveBeenCalledWith(1)
})

test('getByID sin pasar un id da un error específico', () => {
    expect(service.getByID).toThrowError(ClubIdNotDefinedError);
});

test("deleteTeam llama al metodo deleteTeam de repositorio 1 vez", () => {
    service.deleteTeam(3)
    expect(repositoryMock.deleteTeam).toHaveBeenCalledTimes(1)
    expect(repositoryMock.deleteTeam).toHaveBeenCalledWith(3)
})

test("editTeam llama al metodo editTeam del repositorio 1 vez", () => {
    service.editTeam(5)
    expect(repositoryMock.editTeam).toHaveBeenCalledTimes(1)
    expect(repositoryMock.editTeam).toHaveBeenCalledWith(5)
})

test('Llamar a editTeam sin pasar un equipo da un error específico', () => {
    expect(service.editTeam).toThrowError(ClubNotDefinedError);
});

test('Llamar a saveTeam sin pasar un equipo da un error específico', () => {
    expect(service.saveTeam).toThrowError(ClubNotDefinedError);
});

test('Llamar a eliminar un equipo sin pasar un equipo da un error específico', () => {
    expect(service.deleteTeam).toThrowError(ClubNotDefinedError);
});

