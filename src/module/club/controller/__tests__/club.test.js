const ClubController = require('../clubController')
const Club = require('../../entity/Club')
const ClubIdNotDefinedError = require('../../service/error/clubIdNotDefinedError')

const uploadMiddleware = {
    single: jest.fn()
}

const serviceMock = {
    saveTeam: jest.fn(),
    deleteTeam: jest.fn(),
    getByID: jest.fn(),
    getData: jest.fn(),
}

const controller = new ClubController(uploadMiddleware, serviceMock)

test('Index renderea main-page', () => {
    const renderMock = jest.fn()

    controller.index({ session: { errors: [], messages: [] } }, { render: renderMock })

    expect(renderMock).toHaveBeenCalledTimes(1)
    expect(renderMock).toHaveBeenCalledWith('main-page', {
        layout: 'main',
        titulo: "CRUD",
        data: { equipos: undefined },
        errors: [],
        messages: [],
    })

})

test('showSelectedTeam renderea por ID', () => {
    const MOCK_ID = 5
    const renderMock = jest.fn()

    serviceMock.getByID.mockImplementationOnce(() => {
        return { name: "test" }
    })

    controller.showSelectedTeam({ params: { id: MOCK_ID } }, { render: renderMock })
    expect(serviceMock.getByID).toHaveBeenCalledTimes(1)
    expect(serviceMock.getByID).toHaveBeenCalledWith(MOCK_ID)
    expect(renderMock).toHaveBeenCalledWith('view-team', {
        layout: 'main',
        titulo: "test",
        equipo: { name: "test" }
    });
})

test('editSelectedTeam muestra form con info', () => {
    const MOCK_ID = 1
    const renderMock = jest.fn()
    const objectMock = {
        "address": "test",
        "area": {
            "id": 2072,
            "name": undefined,
        },
        "clubColors": "test",
        "crestUrl": "test",
        "email": "test",
        "founded": "test",
        "id": MOCK_ID,
        "name": "test",
        "phone": 12345,
        "shortName": "test",
        "tla": "test",
        "venue": "test",
        "website": "test",
    }

    serviceMock.getByID.mockImplementationOnce(() => {
        return {
            address: "test",
            clubColors: "test",
            crestUrl: "test",
            email: "test",
            founded: "test",
            id: MOCK_ID,
            name: "test",
            phone: 12345,
            shortName: "test",
            tla: "test",
            venue: "test",
            website: "test",
        }
    })

    controller.editSelectedTeam({ params: { id: MOCK_ID } }, { render: renderMock })
    expect(serviceMock.getByID).toHaveBeenCalledWith(MOCK_ID)
    expect(renderMock).toHaveBeenCalledTimes(1)
    expect(renderMock).toHaveBeenCalledWith('edit-team', {
        layout: 'main',
        titulo: "test",
        equipo: objectMock
    });
})

test("deleteSelectedTeam renderea delete-team con valores correctos", () => {
    const renderMock = jest.fn()
    MOCK_ID = 5

    serviceMock.getByID.mockImplementationOnce(() => {
        return {
            name: "test"
        }
    })

    controller.deleteSelectedTeam({ params: { id: MOCK_ID } }, { render: renderMock })
    expect(renderMock).toHaveBeenCalledTimes(1)
    expect(renderMock).toHaveBeenCalledWith('delete-team', {
        layout: 'main',
        titulo: "test",
        equipo: { name: "test" }
    });
})

test("createTeam muestra form 'create-team'", () => {
    const renderMock = jest.fn()

    controller.createTeam({}, { render: renderMock })
    expect(renderMock).toHaveBeenCalledTimes(1)
    expect(renderMock).toHaveBeenCalledWith('create-team', {
        layout: 'main',
        titulo: "New team"
    })

})

test("saveTeam guarda un equipo con un id", () => {
    redirectMock = jest.fn()
    const FAKE_CREST_URL = 'escudo.png'
    const bodyMock = ({
        area: {
            "id": 2072,
            "name": undefined,
        },
        address: undefined,
        clubColors: undefined,
        crestUrl: `/img/escudo.png`,
        email: undefined,
        founded: undefined,
        id: 1,
        name: undefined,
        phone: undefined,
        shortName: undefined,
        tla: undefined,
        venue: undefined,
        website: undefined
    })

    controller.saveTeam(
        { body: bodyMock, file: { filename: FAKE_CREST_URL }, session: {} }, { redirect: redirectMock }
    )
    expect(serviceMock.saveTeam).toHaveBeenCalledTimes(1)
    expect(serviceMock.saveTeam).toHaveBeenCalledWith(bodyMock)
    expect(redirectMock).toHaveBeenCalledTimes(1)
    expect(redirectMock).toHaveBeenCalledWith("/")
})

// test("saveTeam g")

test("saveTeam guarda un equipo cuando no tiene id", () => {
    serviceMock.saveTeam.mockReset();
    redirectMock = jest.fn()
    const FAKE_CREST_URL = 'escudo.png'
    const bodyMock = ({
        area: {
            "id": 2072,
            "name": undefined,
        },
        address: undefined,
        clubColors: undefined,
        crestUrl: '/img/escudo.png',
        email: undefined,
        founded: undefined,
        id: undefined,
        name: undefined,
        phone: undefined,
        shortName: undefined,
        tla: undefined,
        venue: undefined,
        website: undefined
    })
    debugger
    controller.saveTeam(
        { body: bodyMock, file: { filename: FAKE_CREST_URL }, session: {} }, { redirect: redirectMock }
    )
    expect(serviceMock.saveTeam).toHaveBeenCalledTimes(1)
    expect(serviceMock.saveTeam).toHaveBeenCalledWith(bodyMock)
    expect(redirectMock).toHaveBeenCalledTimes(1)
    expect(redirectMock).toHaveBeenCalledWith("/")
})

test("deleteTeam elimina un equipo y redirecciona a '/' ", () => {
    redirectMock = jest.fn()

    controller.deleteTeam(
        { params: { id: 123 }, session: {} }, { redirect: redirectMock }
    )

    expect(serviceMock.deleteTeam).toHaveBeenCalledTimes(1)
    expect(serviceMock.deleteTeam).toHaveBeenCalledWith(123)
    expect(redirectMock).toHaveBeenCalledTimes(1)
    expect(redirectMock).toHaveBeenCalledWith("/")
})

test('Configura las rutas adecuadamente', () => {
    const app = {
        get: jest.fn(),
        post: jest.fn()
    }
    controller.configureRoutes(app)
})