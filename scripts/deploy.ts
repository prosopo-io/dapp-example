// @ts-ignore
import {network, patract} from "redspot";
const {getContractFactory} = patract;
const {api, getAddresses} = network;

async function run() {
    await api.isReady;

    // The redspot signer supports passing in an address. If you want to use  substrate uri, you can do it like this:
    // const signer = createSigner(keyring.createFromUri("bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice"));
    // Or get the configured account from redspot config:
    // const signer = (await getSigners())[0]
    const signerAddresses = await getAddresses();
    const Alice = signerAddresses[0];
    const AliceBalance = await api.query.system.account(Alice);
    console.log("Alice Address:", Alice);
    // @ts-ignore
    console.log("Alice Balance: ", AliceBalance.data.free.toHuman());

    const contractFactory = await getContractFactory("dapp", Alice);

    // The `deploy` method will attempt to deploy a new contract.
    // The `deployed` method will first find out if the same contract already exists based on the parameters.
    // If the contract exists, it will be returned, otherwise a new contract will be created.
    // const contract = await contractFactory.deploy("default", deployer.address);
    let salt = Date.now().toString();

    const contract = await contractFactory.deployed("new", process.env.CONTRACT_ADDRESS, {
        gasLimit: "400000000000",
        value: "20000 UNIT",
        salt: salt,
        name: "dapp-example"
    });

    console.log("");
    console.log(
        "Deploy successfully. The contract address: ",
        contract.address.toString()
    );

    await api.disconnect();

    process.exit();
}


run().catch((err) => {
    console.log(err);

});