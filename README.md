## LFDelegate Monorepo

```
888      8888888888 8888888b.           888                            888
888      888        888  "Y88b          888                            888
888      888        888    888          888                            888
888      8888888    888    888  .d88b.  888  .d88b.   .d88b.   8888b.  888888 .d88b.
888      888        888    888 d8P  Y8b 888 d8P  Y8b d88P"88b     "88b 888   d8P  Y8b
888      888        888    888 88888888 888 88888888 888  888 .d888888 888   88888888
888      888        888  .d88P Y8b.     888 Y8b.     Y88b 888 888  888 Y88b. Y8b.
88888888 888        8888888P"   "Y8888  888  "Y8888   "Y88888 "Y888888  "Y888 "Y8888
                                                          888
                                                     Y8b d88P
                                                      "Y88P"
```

### Run the project

#### Generate the required api keys

Create a new `.env` from template using

```
cp .env.example .env
```

Generate the required api keys for the sepolia network from

https://dashboard.alchemy.com/apps
https://cloud.walletconnect.com/sign-in

and insert them in the new `.env`

```
VITE_ALCHEMY_KEY=
VITE_WALLET_CONNECT_PROJECT_ID=
```

### Setting up Turnkey

The first step is to set up your Turnkey organization and account. By following the [Quickstart](https://docs.turnkey.com/getting-started/quickstart) guide, you should have:

-   A public/private API key pair for Turnkey
-   An organization ID

Once you've gathered these values, add them to a new `.env.local` file. Notice that your API private key should be securely managed and **_never_** be committed to git.

```bash
$ cp .env.local.example .env.local
```

Now open `.env.local` and add the missing environment variables:

-   `VITE_API_PUBLIC_KEY`
-   `VITE_API_PRIVATE_KEY`
-   `VITE_TURNKEY_API_BASE_URL`
-   `VITE_ORGANIZATION_ID`

#### Run the project

```
yarn dev
```
