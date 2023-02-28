import DAIIcon from 'cryptocurrency-icons/svg/color/dai.svg';
import ETHIcon from 'cryptocurrency-icons/svg/color/eth.svg';
import USDCIcon from 'cryptocurrency-icons/svg/color/usdc.svg';
import USDTIcon from 'cryptocurrency-icons/svg/color/usdt.svg';

import type { Coin } from '../types';
import { NetworkChainIds } from '../types/requests';

export const signMethods = [
	'eth_sign',
	'eth_signTypedData',
	'eth_signTypedData_v1',
	'eth_signTypedData_v3',
	'eth_signTypedData_v4',
	'personal_sign',
] as const;

export const txMethods = ['eth_sendTransaction'] as const;

// List of web3 provider methods we want to intercept
export const interceptMethods = [...txMethods, ...signMethods] as const;

export const coinList: Coin[] = [
	{
		ticker: 'ETH',
		name: 'Ethereum',
		icon: ETHIcon,
		networks: [NetworkChainIds.GOERLI, NetworkChainIds.MAINNET],
		default: true,
	},
	{
		ticker: 'USDC',
		name: 'USD Coin',
		icon: USDCIcon,
		permit: true,
		networks: [NetworkChainIds.GOERLI, NetworkChainIds.MAINNET],
	},
	{
		ticker: 'DAI',
		name: 'Dai',
		icon: DAIIcon,
		permit: true,
		networks: [NetworkChainIds.GOERLI, NetworkChainIds.MAINNET],
	},
	{
		ticker: 'USDT',
		name: 'Tether USD',
		icon: USDTIcon,
		permit: true,
		networks: [NetworkChainIds.GOERLI, NetworkChainIds.MAINNET],
	},
];