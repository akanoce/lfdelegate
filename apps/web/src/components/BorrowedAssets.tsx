import { useReserves, useUserReservesIncentives } from '@/api';
import {
    Card,
    CardBody,
    CardHeader,
    HStack,
    Heading,
    Image,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { CryptoIconMap, genericCryptoIcon } from '@/const/icons';
import { RepayAssetButton } from './RepayAssetButton';

const formatAPY = (apy?: number | string) => {
    return `${(Number(apy ?? 0) * 100).toFixed(2)}%`;
};

const formatBalance = (balance?: number | string) => {
    const bn = BigNumber(balance ?? 0);
    const isSmall = bn.lt(0.01);
    if (isSmall) {
        return `< 0.01`;
    }
    return `${Number(balance ?? 0).toFixed(2)}`;
};

type Props = {
    address: string;
};
export const BorrowedAssets = ({ address }: Props) => {
    const { data: userReserves } = useUserReservesIncentives(address);
    const { data: reserves } = useReserves();

    const borrowedReserves =
        userReserves?.formattedUserSummary.userReservesData.filter(
            (reserve) => reserve.totalBorrows !== '0'
        );

    return (
        <Card>
            <CardHeader>
                <Heading fontSize={'2xl'}>Borrowed Assets</Heading>
            </CardHeader>
            <CardBody>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Token</Th>
                                <Th>Borrowed</Th>
                                <Th>Borrow APY</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {borrowedReserves?.map((userReserve) => {
                                const reserve =
                                    reserves?.formattedReserves.find(
                                        (reserve) =>
                                            reserve.id ===
                                            userReserve.reserve.id
                                    );
                                return (
                                    <Tr key={userReserve.underlyingAsset}>
                                        <Td>
                                            <HStack spacing={2}>
                                                <Image
                                                    src={
                                                        reserve
                                                            ? CryptoIconMap[
                                                                  reserve.symbol.toUpperCase()
                                                              ]
                                                            : genericCryptoIcon
                                                    }
                                                    alt={reserve?.symbol}
                                                    boxSize="30px"
                                                />
                                                <Heading size="sm">
                                                    {reserve?.name}
                                                </Heading>
                                            </HStack>
                                        </Td>
                                        <Td>
                                            <VStack
                                                spacing={0}
                                                justify={'flex-start'}
                                                align={'flex-start'}
                                            >
                                                <HStack spacing={1}>
                                                    <Heading size="sm">
                                                        {formatBalance(
                                                            userReserve.totalBorrows
                                                        )}
                                                    </Heading>
                                                    <Text size="sm" as="sub">
                                                        {
                                                            userReserve.reserve
                                                                .name
                                                        }
                                                    </Text>
                                                </HStack>
                                                <HStack spacing={1}>
                                                    <Heading size="sm">
                                                        {formatBalance(
                                                            userReserve.totalBorrowsUSD
                                                        )}
                                                    </Heading>
                                                    <Text size="sm" as="sub">
                                                        USD
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </Td>

                                        <Td>
                                            <Heading size="sm" color="orange">
                                                {formatAPY(
                                                    reserve?.variableBorrowAPY
                                                )}
                                            </Heading>
                                        </Td>
                                        <Td>
                                            <RepayAssetButton
                                                amount={
                                                    userReserve.totalBorrows
                                                }
                                                reserveAddress={
                                                    userReserve.reserve
                                                        .underlyingAsset
                                                }
                                            />
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    );
};
