import {basePath, routesConfig} from "./routesConfig"
import {HomePage} from "../components/pages/HomePage/HomePage";
import {FaqPage} from "../components/pages/FaqPage/FaqPage";


it('should return all defined routes', () => {
    expect(basePath).toEqual(process.env.PUBLIC_URL);
    expect(routesConfig.length).toEqual(2);

    expect(routesConfig[0].path).toEqual(process.env.PUBLIC_URL);
    expect(routesConfig[0].titleKey).toEqual("opptjening-title");
    expect(routesConfig[0].component).toEqual(HomePage);

    expect(routesConfig[1].path).toEqual(process.env.PUBLIC_URL + "/faq");
    expect(routesConfig[1].titleKey).toEqual("faq-title");
    expect(routesConfig[1].component).toEqual(FaqPage);
});
