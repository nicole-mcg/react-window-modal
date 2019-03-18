import React from "react";
import { mount } from "enzyme";
import WindowModal, { eventHandlerToName, IWindowModalProps } from "../src/index";
import VanillaWindowModal from "window-modal";

describe("WindowModal", () => {

    it("can pass options to window-modal", () => {
        const props = {
            focused: true,
            pos: { x: 25, y: 26 },
        };
        const wrapper = mount(<WindowModal {...props} />);

        const div = wrapper.find("div");
        expect(div).toHaveLength(1);
        const id = div.props().id;
        expect(id).toBeTruthy();

        expect(VanillaWindowModal).toHaveBeenCalledWith({
            ...props,
            elementSelector: `#${id}`,
        });
    });

    it("will render children", () => {
        const wrapper = mount((
            <WindowModal>
                Hello!
            </WindowModal>
        ));

        expect(wrapper.text()).toEqual("Hello!");
    });

    it("will update window-modal props", () => {
        const wrapper = mount(<WindowModal/>);
        const { windowModal } = (wrapper.instance() as any);
        expect(windowModal.test).not.toEqual(1);

        wrapper.setProps({ test: 1 });

        expect(windowModal.test).toEqual(1);
    });

    it("will update window-modal title", () => {
        const title = "test title";
        const wrapper = mount(<WindowModal/>);
        const { windowModal } = (wrapper.instance() as any);
        expect(windowModal.title).not.toEqual(title);

        wrapper.setProps({ title });

        expect(windowModal.title).toEqual(title);
    });

    it("will update window-modal size", () => {
        const size = { x: 100, y: 200 };
        const wrapper = mount(<WindowModal/>);
        const { windowModal } = (wrapper.instance() as any);
        expect(windowModal.size).not.toEqual(size);

        wrapper.setProps({ size });

        expect(windowModal.size).toEqual(size);
    });

    it("will update window-modal pos", () => {
        const pos = { x: 101, y: 202 };
        const wrapper = mount(<WindowModal/>);
        const { windowModal } = (wrapper.instance() as any);
        expect(windowModal.pos).not.toEqual(pos);

        wrapper.setProps({ pos });

        expect(windowModal.pos).toEqual(pos);
    });

    it("will update window-modal focused", () => {
        const focused = true;
        const wrapper = mount(<WindowModal/>);
        const { windowModal } = (wrapper.instance() as any);
        expect(windowModal.focused).not.toEqual(focused);

        wrapper.setProps({ focused });

        expect(windowModal.focused).toEqual(focused);
    });

    it("will update window-modal resizable", () => {
        const resizable = true;
        const wrapper = mount(<WindowModal/>);
        const { windowModal } = (wrapper.instance() as any);
        expect(windowModal.resizable).not.toEqual(resizable);

        wrapper.setProps({ resizable });

        expect(windowModal.resizable).toEqual(resizable);
    });

    it("will update window-modal movable", () => {
        const movable = true;
        const wrapper = mount(<WindowModal/>);
        const { windowModal } = (wrapper.instance() as any);
        expect(windowModal.movable).not.toEqual(movable);

        wrapper.setProps({ movable });

        expect(windowModal.movable).toEqual(movable);
    });

    it("can be destroyed", () => {
        const props = Object.keys(eventHandlerToName).reduce((acc, handlerName) => {
            acc[handlerName] = jest.fn();
            return acc;
        }, {} as any);
        const wrapper = mount(<WindowModal {...props} />);
        const { windowModal } = (wrapper.instance() as any);
        wrapper.unmount();

        Object.keys(props).forEach((propName) => {
            const handler = props[propName];
            const eventName: any = (eventHandlerToName as any)[propName];
            expect(windowModal.removeEventListener)
                .toHaveBeenCalledWith(eventName, handler);
        });

    });

    // Event handlers
    Object.keys(eventHandlerToName).forEach((handlerName) => {
        const eventName = eventHandlerToName[handlerName as keyof IWindowModalProps];
        it(`will set ${eventName} event listener`, () => {
            const handler = jest.fn();
            const wrapper = mount(<WindowModal {...{ [handlerName]: handler }}/>);
            const { windowModal } = (wrapper.instance() as any);
            expect(windowModal.addEventListener)
                .toHaveBeenCalledWith(eventName, handler);
        });

        it(`can update ${eventName} event listener`, () => {
            const handler = jest.fn();
            const wrapper = mount(<WindowModal/>);
            const { windowModal } = (wrapper.instance() as any);
            expect(windowModal.addEventListener)
                .not.toHaveBeenCalled();

            wrapper.setProps({ [handlerName]: handler });
            expect(windowModal.addEventListener)
                .toHaveBeenCalledWith(eventName, handler);
        });

        it(`will remove ${eventName} event listener`, () => {
            const handler = jest.fn();
            const wrapper = mount(<WindowModal {...{ [handlerName]: handler }}/>);
            const { windowModal } = (wrapper.instance() as any);
            expect(windowModal.addEventListener)
                .toHaveBeenCalledWith(eventName, handler);
            wrapper.setProps({ [handlerName]: null });
            expect(windowModal.removeEventListener)
                .toHaveBeenCalledWith(eventName, handler);
        });

    });

});
