// IPアドレスの計算関係です。

// CIDRからIPアドレスリストに変換します。
export function cidrToIpList(cidr: string): [string[], string] {
    const [baseIp, prefix] = cidr.split("/");
    const baseParts = baseIp.split(".").map(Number);
    const numAddresses = 1 << (32 - Number(prefix));
    const ipList: string[] = [];

    for (let i = 0; i < numAddresses; i++) {
        const ipParts = [...baseParts];
        ipParts[3] += i;

        for (let j = 3; j > 0; j--) {
            if (ipParts[j] > 255) {
                ipParts[j] -= 256;
                ipParts[j - 1]++;
            }
        }

        ipList.push(ipParts.join(".") + `/${prefix}`);
    }
    //  // 最初のIPアドレス（ネットワークアドレス）と最後のIPアドレス（ブロードキャストアドレス）を除外
    ipList.shift();
    ipList.pop();

    return [ipList, prefix];
}
