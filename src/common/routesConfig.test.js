import {basePath, routesConfig} from "./routesConfig"
import {HomePage} from "../components/pages/HomePage/HomePage";
import {NotFoundPage} from "../components/pages/NotFoundPage/NotFoundPage";



it('should return all defined routes', () => {
    expect(basePath).toEqual(process.env.PUBLIC_URL);
    expect(routesConfig.length).toEqual(3);

    expect(routesConfig[0].path).toEqual("/:lng(en|nn|nb)/");
    expect(routesConfig[0].titleKey).toEqual("opptjening-tittel");
    expect(routesConfig[0].component).toEqual(HomePage);

    expect(routesConfig[1].path).toEqual("/:lng(en|nn|nb)/404/");
    expect(routesConfig[1].titleKey).toEqual("404-title");
    expect(routesConfig[1].component).toEqual(NotFoundPage);
});
