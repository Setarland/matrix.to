/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {
    LinkedClient,
    Maturity,
    ClientKind,
    ClientId,
    Platform,
    StoreDistribution,
} from './types';
import { LinkKind } from '../parser/types';
import logo from '../imgs/element.svg';

export const Element: LinkedClient = {
    kind: ClientKind.LINKED_CLIENT,
    name: 'Element',
    author: 'Element',
    logo: logo,
    homepage: 'https://element.io',
    maturity: Maturity.STABLE,
    description: 'Cross platfom fully-featured Matrix client',
    platforms: [Platform.Desktop, Platform.Android, Platform.iOS],
    experimental: false,
    clientId: ClientId.Element,
    toUrl: (link) => {
        const params = link.arguments.originalParams.toString();
        const prefixedParams = params ? `?${params}` : '';
        switch (link.kind) {
            case LinkKind.Alias:
            case LinkKind.RoomId:
                return new URL(
                    `https://app.element.io/#/room/${link.identifier}${prefixedParams}`
                );
            case LinkKind.UserId:
                return new URL(
                    `https://app.element.io/#/user/${link.identifier}${prefixedParams}`
                );
            case LinkKind.Permalink:
                return new URL(
                    `https://app.element.io/#/room/${link.identifier}${prefixedParams}`
                );
            case LinkKind.GroupId:
                return new URL(
                    `https://app.element.io/#/group/${link.identifier}${prefixedParams}`
                );
        }
    },
    linkSupport: () => true,
    installLinks: [
        new StoreDistribution(
            'App Store',
            Platform.iOS,
            'https://apps.apple.com/app/vector/id1083446067',
            false
        ),
        new StoreDistribution(
            'Google Play',
            Platform.Android,
            'https://play.google.com/store/apps/details?id=im.vector.app',
            true
        ),
        new StoreDistribution(
            'F-Droid',
            Platform.Android,
            'https://f-droid.org/fr/packages/im.vector.app/',
            false
        ),
        // TODO desktop clients?
    ],
};

export const ElementDevelop: LinkedClient = {
    kind: ClientKind.LINKED_CLIENT,
    name: 'Element Develop',
    author: 'Element',
    logo: logo,
    homepage: 'https://element.io',
    maturity: Maturity.STABLE,
    description: 'Fully-featured Matrix client for the Web',
    platforms: [Platform.Desktop],
    experimental: true,
    clientId: ClientId.ElementDevelop,
    toUrl: (link) => {
        switch (link.kind) {
            case LinkKind.Alias:
            case LinkKind.RoomId:
                return new URL(
                    `https://develop.element.io/#/room/${link.identifier}`
                );
            case LinkKind.UserId:
                return new URL(
                    `https://develop.element.io/#/user/${link.identifier}`
                );
            case LinkKind.Permalink:
                return new URL(
                    `https://develop.element.io/#/room/${link.identifier}`
                );
            case LinkKind.GroupId:
                return new URL(
                    `https://develop.element.io/#/group/${link.identifier}`
                );
        }
    },
    linkSupport: () => true,
    installLinks: [],
};
