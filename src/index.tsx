import React, { Component } from "react";
import VanillaWindowModal, {
    IWindowModalOptions,
    WindowModalBlurEvent,
    WindowModalUnminimizeEvent,
    WindowModalMinimizeEvent,
    WindowModalFocusEvent,
    WindowModalResizeEvent,
    WindowModalMoveEvent,
} from "window-modal";

export interface IWindowModalProps extends IWindowModalOptions {
    focused?: boolean;
    elementSelector?: never;
    onMinimize?: (event: WindowModalMinimizeEvent) => void;
    onUnminimize?: (event: WindowModalUnminimizeEvent) => void;
    onFocus?: (event: WindowModalFocusEvent) => void;
    onBlur?: (event: WindowModalBlurEvent) => void;
    onResize?: (event: WindowModalResizeEvent) => void;
    onMove?: (event: WindowModalMoveEvent) => void;
}

export const eventHandlerToName: { [K in keyof IWindowModalProps]: string } = {
    onMinimize: "minimize",
    onUnminimize: "unminimize",
    onFocus: "focus",
    onBlur: "blur",
    onResize: "resize",
    onMove: "move",
};

export class WindowModal extends Component<IWindowModalProps> {
    private windowModal: VanillaWindowModal | null;
    private elementId: string;

    constructor(props: IWindowModalProps) {
        super(props);
        this.elementId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.windowModal = null;
    }

    componentDidMount() {
        const props = this.props as any;

        this.windowModal = new VanillaWindowModal({
            ...this.props,
            elementSelector: this.elementId,
        });

        Object.keys(eventHandlerToName).forEach((handlerName: string) => {
            const handler = props[handlerName];
            const eventName = eventHandlerToName[handlerName as keyof IWindowModalProps];
            if (handler && eventName) {
                this._addEventListener(eventName, handler);
            }
        });
    }

    componentWillUnmount() {
        const { windowModal } = this;
        const props = this.props as any;

        if (!windowModal) {
            return;
        }

        Object.keys(eventHandlerToName).forEach((handlerName: string) => {
            const handler = props[handlerName];
            const eventName = eventHandlerToName[handlerName as keyof IWindowModalProps];
            if (!eventName || !handler) {
                return;
            }

            this._removeEventListener(eventName, handler);
        });
        windowModal.destroy();
    }

    componentDidUpdate(prevProps: any) {
        const { windowModal } = this;
        const props = this.props as any;

        if (!windowModal) {
            return;
        }

        if (prevProps.title !== props.title) {
            windowModal.title = props.title || "";
        }

        if (prevProps.size !== props.size) {
            windowModal.size = props.size || { x: 0, y: 0 };
        }

        if (prevProps.pos !== props.pos) {
            windowModal.pos = props.pos || { x: 0, y: 0 };
        }

        if (prevProps.focused !== props.focused) {
            windowModal.focused = Boolean(props.focused);
        }

        if (prevProps.resizable !== props.resizable) {
            windowModal.resizable = Boolean(props.resizable);
        }

        if (prevProps.movable !== props.movable) {
            windowModal.movable = Boolean(props.movable);
        }

        Object.keys(eventHandlerToName).forEach((handlerName: string) => {
            const oldHandler = prevProps[handlerName];
            const newHandler = props[handlerName];
            const eventName = eventHandlerToName[handlerName as keyof IWindowModalProps];
            if (!eventName || newHandler === oldHandler) {
                return;
            }

            if (oldHandler) {
                this._removeEventListener(eventName, oldHandler);
                return;
            }

            if (newHandler) {
                this._addEventListener(eventName, newHandler);
                return;
            }
        });
    }

    render() {
        return (
            <div id={this.elementId}>
                {this.props.children}
            </div>
        );
    }

    _addEventListener(eventName: string, handler: (event: Event) => void) {
        const { windowModal } = this;
        if (!windowModal) {
            return;
        }

        const { element } = windowModal;
        element.addEventListener(eventName, handler);
    }

    _removeEventListener(eventName: string, handler: (event: Event) => void) {
        const { windowModal } = this;
        if (!windowModal) {
            return;
        }

        const { element } = windowModal;
        element.removeEventListener(eventName, handler);
    }
}
