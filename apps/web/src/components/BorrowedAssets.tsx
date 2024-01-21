import { useReserves, useUserReservesIncentives } from '@/api';
import {
    Box,
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
import { CryptoIconMap, genericCryptoIcon } from '@/const/icons';
import { RepayAssetButton } from './RepayAssetButton';
import { formatAPY, formatBalance } from '@/util/formatting';

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
                <HStack w="full" justify="space-between">
                    <Heading fontSize={'2xl'}>Borrowed Assets</Heading>
                    <Box>
                        <Heading size="xs" color="orange">
                            Total borrowed
                        </Heading>
                        <Heading size="sm">
                            {formatBalance(
                                userReserves?.formattedUserSummary
                                    .totalBorrowsUSD,
                                'USD'
                            )}
                        </Heading>
                    </Box>
                </HStack>
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