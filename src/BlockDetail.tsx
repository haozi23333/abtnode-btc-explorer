import {Card, Col, message, Row, Space, Statistic, Table} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {IBtcBlockData} from "./IBtcBlockData";
import ProTable, {ProColumns} from '@ant-design/pro-table';

const getBlockData = async (hash: string): Promise<IBtcBlockData.RootObject> => {
  const res = await fetch(`https://blockchain.info/rawblock/` + hash)
  return res.json()
}

export default () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [blockData, setBlockData] = useState<IBtcBlockData.RootObject>({
    bits: 0,
    block_index: 0,
    fee: 0,
    hash: "",
    height: 0,
    main_chain: false,
    mrkl_root: "",
    n_tx: 0,
    next_block: [],
    nonce: 0,
    prev_block: "",
    size: 0,
    time: 0,
    tx: [],
    ver: 0,
    weight: 0
  })
  const { hash } = useParams<{ hash: string }>()

  const columns: ProColumns<IBtcBlockData.Tx>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: 'hash',
      dataIndex: 'hash',
      copyable: true,
      search: false
    },
    {
      title: 'input 数量',
      valueType: 'text',
      render: (_, tx) => {
        return tx.vin_sz
      }
    },
    {
      title: 'out 数量',
      valueType: 'text',
      render: (_, tx) => {
        return tx.vout_sz
      }
    },
    {
      title: '交易金额',
      valueType: 'text',
      render: (_, tx) => {
        return tx.out.map((out) => out.value).reduce((a, b) => a + b, 0) / 100000000 + ' BTC'
      }
    },
    {
      title: '手续费',
      valueType: 'text',
      render: (_, tx) => {
        return tx.fee / 100000000 + ' BTC'
      }
    }
  ]

  useEffect(() => {
    getBlockData(hash).then(data => {
      if (data.error) {
        message.error(data.message)
        setLoading(false)
        return
      }
      setBlockData(data)
      setLoading(false)
    })
  }, [hash])

  return <>
    <Card title="基本信息" loading={loading}>
      <Row gutter={16}>
        <Col span={4}>
          <Statistic title="Height" value={blockData.height} />
        </Col>
        <Col span={4}>
          <Statistic title="Number of Transactions" value={blockData.n_tx} />
        </Col>
        <Col span={4}>
          <Statistic title="Weight" value={blockData.weight} />
        </Col>
        <Col span={4}>
          <Statistic title="Size" value={blockData.size} suffix='bytes'/>
        </Col>
        <Col span={4}>
          <Statistic title="Nonce" value={blockData.nonce} />
        </Col>
        <Col span={4}>
          <Statistic title="Timestamp" value={blockData.time === 0 ? '未知' : new Date(blockData.time * 1000).toLocaleString()} />
        </Col>
      </Row>
     <Space>
     </Space>
    </Card>
    <Card>
      <ProTable columns={columns} dataSource={blockData.tx} loading={loading}>
      </ProTable>
    </Card>
  </>
}