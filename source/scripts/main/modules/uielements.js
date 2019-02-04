/*
 * Refer to templates.js module
 * for string literals and information
 */
/*global Templates */
'use strict';

((window, UIElements) => {
    UIElements.cacheElements = () => {
        UIElements.$el = {
            background: {
                video_element: $('#video-background'),
                video_source: $('#video-background > source')
            },
            footer: {
                copyright: $('.copyright')
            },
            link: $('.gtag'),
            linksContainer: $('#links-container'),
            socialLinksContainer: $('#social-links-container'),
            descriptiveLink: $('.descriptive'),
            linkDescription: $('.linkdescription'),
            hideDescription: $('.hidedescription')
        };
    };
    UIElements.showProgressBar = ($container, indeterminate = true) => {
        $container.html('').append(Templates._ProgressBar(indeterminate));
    };
    UIElements.displaySummaryDetails = (links, $el) => {
        let linkElement = '';
        $el.html('');
        links.forEach(element => {
            console.log(element);
            linkElement =
                typeof element.description === 'undefined'
                    ? Templates._ALinkElement({
                        href: element.href,
                        text: element.text,
                        title: element.title,
                        target: element.target
                    })
                    : Templates._SummaryDetails({
                        summary: element.text,
                        details: element.description
                    });
            $el.append(linkElement);
        });
    };
    UIElements.displayLinks = (
        links,
        $el,
        hasPadding = true,
        inline = false,
        showDataDescription = true,
        linkFromDataDescription = true,
        dataDescriptionCSSClass = 'linkdescription',
        htmlListTag = 'ul', // stick with unordered list for now
        htmlListItemTag = 'li'
    ) => {
        let $container;
        $el.html('');
        if (hasPadding) {
            let cssPaddingClass = 'link-padding';
            $el.append(Templates._PaddedDiv(cssPaddingClass));
            $container = hasPadding ? $el.find(`.${cssPaddingClass}`) : $el;
        } else {
            $container = $el;
        }
        $container.append($(`<${htmlListTag}>`));
        $container = $container.find(htmlListTag);
        links.forEach(element => {
            let icon =
                    typeof element.icon === 'undefined'
                        ? ''
                        : Templates._IconElement(element.icon),
                text = typeof element.text === 'undefined' ? '' : element.text,
                dataDescription =
                    typeof element.description === 'undefined'
                        ? ''
                        : element.description,
                href = '',
                objALinkElement = {
                    dataDescription: dataDescription,
                    target: element.target,
                    title: element.title,
                    text: `${text} ${icon}`
                },
                aLinkElement = '',
                linkElement = '',
                linkDescription = '',
                closeIcon = Templates._IconElement('cancel-circle'),
                closeDescriptionLink = '',
                dataDescriptionLink = '';
            if (linkFromDataDescription) {
                if (dataDescription === '') {
                    href = element.href === '' ? '' : `${element.href}`;
                } else {
                    href = '';
                    dataDescriptionLink =
                        element.href === ''
                            ? ''
                            : Templates._ALinkElement({
                                cssClass: element.class,
                                  //dataDescription: element.description,
                                href: element.href,
                                title: element.title,
                                target: element.target,
                                text: Templates._IconElement('share')
                            });
                }
            } else {
                href = element.href === '' ? '' : `${element.href}`;
            }
            objALinkElement.cssClass = element.class;
            objALinkElement.href = href;
            aLinkElement = Templates._ALinkElement(objALinkElement);
            closeDescriptionLink = `<span class="hidedescription" title="Close">${closeIcon}</span>`;
            linkDescription =
                dataDescription === ''
                    ? ''
                    : `<p class="${dataDescriptionCSSClass}">${closeDescriptionLink} ${dataDescription} ${dataDescriptionLink}</p>`;
            linkElement = `<${htmlListItemTag}>${aLinkElement}${linkDescription}</${htmlListItemTag}>`;
            $container.append(linkElement);
        });
    };
})(window, (window.UIElements = window.UIElements || {}));
