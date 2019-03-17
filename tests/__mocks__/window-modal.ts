
const elementStub = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
};
const windowModalStub = {
    element: elementStub,
    destroy: jest.fn(),
};
export const WindowModal = jest.fn().mockImplementation(() => {
    return windowModalStub;
});
