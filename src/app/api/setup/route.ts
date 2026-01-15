import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      rpcUrl,
      privateKey,
      domain,
      alchemySigningKey,
      alchemyAuthToken,
      // Optional Contract Addresses
      CLAIM_TOPICS_REGISTRY,
      ENTRY_POINT_ADDRESS,
      IDENTITY_REGISTRY_STORAGE,
      TOKEN_IMPLEMENTATION,
      TRUSTED_ISSUERS_REGISTRY,
      COMPANY_ASSETS_FACTORY,
      SCW_FACTORY_ADDRESS,
    } = data;

    /**
     * Info: (20260115 - Luphia) Basic Validation (Contracts are optional for the first save step, but good to check if finalizing)
     * We treat the core config as required.
     */
    if (
      !rpcUrl ||
      !privateKey ||
      !domain ||
      !alchemySigningKey ||
      !alchemyAuthToken
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const envLines = [
      `NEXT_PUBLIC_BLOCKCHAIN_RPC_URL=${rpcUrl}`,
      `PRIVATE_KEY=${privateKey}`,
      `NEXT_PUBLIC_DOMAIN=${domain}`,
      `ALCHEMY_SIGNING_KEY=${alchemySigningKey}`,
      `ALCHEMY_AUTH_TOKEN=${alchemyAuthToken}`,
      `NEXT_PUBLIC_APP_CONFIGURED=true`,
    ];

    // Info: (20260115 - Luphia) Append optional contract addresses if they exist
    const contracts: Record<string, string | undefined> = {
      CLAIM_TOPICS_REGISTRY,
      ENTRY_POINT_ADDRESS,
      IDENTITY_REGISTRY_STORAGE,
      TOKEN_IMPLEMENTATION,
      TRUSTED_ISSUERS_REGISTRY,
      COMPANY_ASSETS_FACTORY,
      SCW_FACTORY_ADDRESS,
    };

    Object.entries(contracts).forEach(([key, value]) => {
      if (value) {
        envLines.push(`NEXT_PUBLIC_${key}=${value}`);
      }
    });

    const envContent = envLines.join("\n");
    const envPath = path.join(process.cwd(), ".env.local");
    fs.writeFileSync(envPath, envContent, "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
