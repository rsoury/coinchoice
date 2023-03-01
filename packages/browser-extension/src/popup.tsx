import { useCallback, useEffect, useState } from 'react';
import { MantineProvider } from '@mantine/core';
import {
	Text,
	Container,
	Title,
	Button,
	ThemeIcon,
	Flex,
	Image,
} from '@mantine/core';
import { IconCurrencyCent, IconArrowLeft } from '@tabler/icons-react';

import type { Coin } from './types';
import { coinList } from './utils/constants';
import { bus } from './utils/bus';

enum Steps {
	Primary,
	CurrencySelect,
}

const defaultCoin = coinList.find((coin) => !!coin.default);

function IndexPopup() {
	const [selectedCoin, setSelectedCoin] = useState(defaultCoin);
	const [step, setStep] = useState(Steps.Primary);

	useEffect(() => {
		// Request default currency from DB
	}, []);

	const onCoinSelectStart = useCallback(() => {
		setStep(Steps.CurrencySelect);
	}, []);

	const onBackButton = useCallback(() => {
		setStep(Steps.Primary);
	}, []);

	const onCoinSelectFinal = useCallback((coin: Coin) => {
		setSelectedCoin(coin);
		setStep(Steps.Primary);
		// Set request to backend to mark coin as selected
	}, []);

	return (
		<MantineProvider>
			<Container miw={400} mah={600} p={20} sx={() => ({ overflowY: 'auto' })}>
				{step === Steps.Primary && (
					<Container>
						<ThemeIcon
							size="xl"
							variant="gradient"
							gradient={{ from: 'indigo', to: 'cyan' }}
							mb={10}
						>
							<IconCurrencyCent size={24} />
						</ThemeIcon>
						<Title size="h2">Welcome to CoinChoice!</Title>
						<Text fz="xl" mb={40}>
							Take control over how your pay for gas
						</Text>
						<Text fz="sm" fw={700} mb={5} sx={() => ({ textAlign: 'left' })}>
							Selected Coin:
						</Text>
						<Flex
							align="center"
							justify="center"
							direction="row"
							gap="md"
							mb={40}
							sx={() => ({
								border: `1px solid rgba(0, 0, 0, 0.1)`,
								borderRadius: 8,
								backgroundColor: `rgb(250, 250, 250)`,
							})}
							p={10}
						>
							<Image src={selectedCoin.icon} maw={50} mah={50} />
							<Text fs="lg" fw={700}>
								{selectedCoin ? selectedCoin.ticker.toUpperCase() : 'ETH'}
							</Text>
						</Flex>
						<Button
							onClick={onCoinSelectStart}
							size="lg"
							sx={() => ({
								width: '100%',
							})}
						>
							Choose Gas Coin
						</Button>
					</Container>
				)}
				{step === Steps.CurrencySelect && (
					<Container>
						<Flex direction="row" align="center" justify="flex-start" mb={20}>
							<Button
								onClick={onBackButton}
								variant="subtle"
								leftIcon={<IconArrowLeft />}
								mr={10}
							/>
							<Text fz="lg" fw={700}>
								Select a Gas Coin
							</Text>
						</Flex>
						{coinList.map((coin) => (
							<Button
								variant="outline"
								leftIcon={
									<Container w={30} mah={30}>
										<Image src={coin.icon} bgsz="contain" />
									</Container>
								}
								mb={10}
								size="md"
								h="auto"
								w="100%"
								sx={() => ({ display: 'flex', justifyContent: 'flex-start' })}
								onClick={() => onCoinSelectFinal(coin)}
							>
								<Flex direction="column">
									<Text fs="sm" fw={700}>
										{coin.ticker}
									</Text>
									<Text fs="xs" fw={400} opacity={0.8}>
										{coin.name}
									</Text>
								</Flex>
							</Button>
						))}
					</Container>
				)}
			</Container>
		</MantineProvider>
	);
}

export default IndexPopup;