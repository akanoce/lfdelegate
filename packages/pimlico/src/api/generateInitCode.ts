import { Hex, concat, encodeFunctionData } from 'viem';
import { simpleAccountFactoryABI } from '../../util';

export const generateInitCode = (factoryAddress: Hex, senderAddress: Hex) => {
    if (!factoryAddress || !senderAddress)
        throw new Error('Missing factory or sender address');
    return concat([
        factoryAddress,
        encodeFunctionData({
            abi: simpleAccountFactoryABI,
            functionName: 'createAccount',
            args: [senderAddress, 0n]
        })
    ]);
};
