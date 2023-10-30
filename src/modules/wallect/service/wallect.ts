import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Wallet } from '../../../entities/wallect.entity';
import { PrimeSdk } from '@etherspot/prime-sdk';
import { ethers } from 'ethers';
import { MerkleTree } from 'merkletreejs';

@Injectable()
export class WallectService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}
  async create(): Promise<string> {
    try {
      // generate random mnemonic
      const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
      // create HD wallet
      const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
      const wallet = ethers.Wallet.fromPhrase(mnemonic);

      // The password used to encrypt json can be changed to something else
      const pwd = 'planckerDev';
      const json = await wallet.encrypt(pwd);

      // Create AA Wallet with HD Wallet
      const primeSdk = new PrimeSdk(
        {
          privateKey: hdNode.privateKey,
        },
        {
          chainId: 80001,
          projectKey: '',
          rpcProviderUrl: 'https://mumbai-bundler.etherspot.io/',
        },
      );

      const address: string = await primeSdk.getCounterFactualAddress();
      console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
      // save sqllite
      await this.walletRepository.save({
        address: address,
        password: JSON.stringify(json),
      });
      return address;
    } catch (error) {
      console.log(error);
    }
    return '';
  }
  async batchCreate(): Promise<string> {
    // generate random mnemonic
    const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(32));
    // create HD wallet
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic);
    // send five wallets
    const numWallet = 5;
    // generate path：m / purpose' / coin_type' / account' / change / address_index
    const basePath = "m/44'/60'/0'/0";
    const wallets = [];
    for (let i = 0; i < numWallet; i++) {
      const hdNodeNew = hdNode.derivePath(basePath + '/' + i);
      const walletNew = new ethers.Wallet(hdNodeNew.privateKey);
      console.log(`第${i + 1}个钱包地址： ${walletNew.address}`);
      wallets.push(walletNew);
    }
    return '';
  }
  async bind(): Promise<string> {
    // check the phone number
    // check the phone number is bind
    // create hash
    // go to bind

    const FindWallet: Wallet = await this.walletRepository.findOne({
      where: {
        phone: IsNull(),
      },
    });
    // Hash leaves
    const leaves = ethers.keccak256(FindWallet.address);
    // Create tree
    const merkleTree = new MerkleTree([leaves], ethers.keccak256);
    const rootHash = merkleTree.getRoot().toString('hex');

    // Pretty-print tree
    console.log(merkleTree.toString());
    console.log(rootHash);

    await this.walletRepository.update(FindWallet.id, { hash: rootHash });

    return rootHash;
  }
  async check(): Promise<string> {
    return '';
  }
}
