# Zentari Network | Server Handler Uploader BP

A Minecraft Bedrock Edition behavior pack that reports server TPS and player count to the Server Handler API at a regular interval.

## Requirements

- [Bun](https://bun.sh) (used for installing packages and compiling)
- A running instance of the Server Handler with its API enabled

## Setup

### 1. Clone the repository

Navigate to your Minecraft server's `development_behavior_packs` folder and clone the repo there:

```bash
cd /path/to/server/development_behavior_packs
git clone https://github.com/Zentari-Network/Server-Handler.git ServerHandlerUploaderBP
```

### 2. Install packages

```bash
bun install
```

### 3. Configure the API secret

Open `src/lib/API.ts` and set `APISecret` to match the `api_secret` value found in the handler's `lib/config.json`:

```ts
const APIConfig = {
  Endpoint: "http://172.17.0.1:3000",
  APISecret: "your_secret_here", // must match api_secret in handler/lib/config.json
};
```

### 4. Add the pack to your world

In your world's folder, open (or create) `world_behavior_packs.json` and add the following:

```json
[
  {
    "pack_id": "3f7677b0-47ef-11f1-826f-bc2411bf3ad4",
    "version": [1, 0, 0]
  }
]
```

### 5. Compile

```bash
bun compile
```

This bundles `src/main.ts` into `scripts/main.js`, which is the entry point Minecraft loads.

## Usage

Once compiled, deploy the behavior pack to a Minecraft Bedrock server that is managed by the Server Handler. The pack will automatically start reporting TPS and player count to the handler's API.
