import binary from './binary.mock';
export const binaryMock = binary;

import prefixZenData from './prefix-zen-data.mock';
export const prefixZenDataMock = prefixZenData;

import simpleVob from './simple-vob.mock';
export const simpleVobMock = simpleVob;

import triggerListVob from './trigger-list-vob.mock';
export const triggerListVobMock = triggerListVob;

import vobtree from './vobtree.mock';
export const vobtreeMock = vobtree;

export const worldMock = prefixZenData + binary + '\n		[VobTree % 0 0]' + vobtree;

import waypoint from './waypoint.mock';
export const waypointMock = waypoint;

import way from './way.mock';
export const wayMock = way;

import waynet from './waynet.mock';
export const waynetMock = waynet;
