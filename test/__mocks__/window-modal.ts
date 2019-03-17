
const windowModalStub = {
    destroy: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
};
export default jest.fn().mockImplementation(() => {
    return windowModalStub;
});
