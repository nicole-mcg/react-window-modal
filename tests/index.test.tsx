import React from "react";
import { mount } from "enzyme";
import { WindowModal } from "@src/index";

describe("Nothing", () => {

    it("Works", () => {
        const wrapper = mount(<WindowModal/>);

        const div = wrapper.find("div");
        expect(div).toHaveLength(1);
    });

});
