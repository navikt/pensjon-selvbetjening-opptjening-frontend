import {basePath, routesConfig} from "./routesConfig"
import {HomePage} from "../components/pages/HomePage/HomePage";
import {FaqPage} from "../components/pages/FaqPage/FaqPage";
import {NotFoundPage} from "../components/pages/NotFoundPage/NotFoundPage";



it('should return all defined routes', () => {
    expect(basePath).toEqual(process.env.PUBLIC_URL);
    expect(routesConfig.length).toEqual(3);

    expect(routesConfig[0].path).toEqual("/");
    expect(routesConfig[0].titleKey).toEqual("opptjening-title");
    expect(routesConfig[0].component).toEqual(HomePage);

    expect(routesConfig[1].path).toEqual("/faq");
    expect(routesConfig[1].titleKey).toEqual("faq-title");
    expect(routesConfig[1].component).toEqual(FaqPage);

    expect(routesConfig[2].path).toEqual("/404");
    expect(routesConfig[2].titleKey).toEqual("404-title");
    expect(routesConfig[2].component).toEqual(NotFoundPage);
});
