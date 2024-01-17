import { ShimmerButton } from '@/components';

type Props = {
    login: () => void;
    signup: (walletName: string) => Promise<void>;
};

export const Onboarding = ({ login, signup }: Props) => {
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="flex flex-col gap-y-4">
                <ShimmerButton
                    className="h-14 shadow-2xl"
                    shimmerColor="purple"
                    shimmerSize="0.1em"
                    background="white"
                    onClick={() => signup(`Wallet ${Math.random()}`)}
                >
                    <span className="px-1 text-center font-bold leading-none">
                        Get a wallet
                    </span>
                </ShimmerButton>

                <ShimmerButton
                    className="h-14 shadow-2xl"
                    shimmerColor="purple"
                    shimmerSize="0.1em"
                    background="white"
                    onClick={login}
                >
                    <span className="px-1 text-center font-bold leading-none">
                        Have a wallet?
                    </span>
                </ShimmerButton>
            </div>
        </div>
    );
};
