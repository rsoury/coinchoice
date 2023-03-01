import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { SimulationDto } from './dto/simulation.dto';
import { ApproveDto } from './dto/approve.dto';
import { TransactionDto } from './dto/transaction.dto';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('hello')
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('products')
	getDummyProducts(): Observable<Array<object>> {
		return this.appService.getDummyProducts();
	}

	@Post('transactions/relayswap')
	executeMetaTransaction(@Body() transactionDto: TransactionDto) {
		return this.appService.executeMetaTransaction(
			transactionDto.user,
			transactionDto.token,
			transactionDto.permit,
			transactionDto.swapSpender,
			transactionDto.to,
			transactionDto.swapCall,
		);
	}

	@Post('transactions/approve')
	executeApprove(@Body() approveDto: ApproveDto) {
		return this.appService.executeApprove(
			approveDto.token,
			approveDto.spender,
			approveDto.amount,
		);
	}

	@Post('simulation')
	simulation(@Body() simulationDto: SimulationDto) {
		return this.appService.simulation(
			simulationDto.from,
			simulationDto.to,
			simulationDto.input,
			simulationDto.value,
			simulationDto.token,
		);
	}

	@Post('simulation/gasfee')
	getTenderlySimulationGasFee(@Body() simulationDto: SimulationDto) {
		return this.appService.getTenderlySimulationGasFee(
			simulationDto.from,
			simulationDto.to,
			simulationDto.input,
			simulationDto.value,
		);
	}

	@Post('simulation/gas')
	getTenderlySimulation(@Body() simulationDto: SimulationDto) {
		return this.appService.getTenderlySimulation(
			simulationDto.from,
			simulationDto.to,
			simulationDto.input,
			simulationDto.value,
		);
	}

	@Get('gasprice')
	getGasPrices() {
		return this.appService.getGasPrice();
	}

	@Get('tokenprice')
	getTokenSwapInfo(@Query('token') token, @Query('amount') amount) {
		return this.appService.getTokenSwapInfo(token, amount);
	}

	@Get('ethbalance')
	getEthBalance(@Query('address') address) {
		return this.appService.getEthBalance(address);
	}

	@Get('tokenbalance')
	getTokenBalance(
		@Query('token') tokenAddress,
		@Query('address') walletAddress,
	) {
		return this.appService.getTokenBalance(tokenAddress, walletAddress);
	}
}
