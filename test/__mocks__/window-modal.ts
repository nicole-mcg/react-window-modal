
const elementStub = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
};
const windowModalStub = {
    element: elementStub,
    destroy: jest.fn(),
};
export default jest.fn().mockImplementation(() => {
    return windowModalStub;
});
