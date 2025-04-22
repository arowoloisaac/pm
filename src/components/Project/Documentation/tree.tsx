import { useMemo, useState } from "react";
import { IWiki, IWikiTree } from "../utils/utils";
import "rc-tree/assets/index.css";
import Tree from "rc-tree";

const TreeComponent = ({ getWiki }: { getWiki: IWiki[] }) => {

  const [expandedKeys, setExpandedKeys] = useState(["0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  function mapToTree(wiki: IWiki): IWikiTree {
    const tree: IWikiTree = {
      key: wiki.id,
      title: wiki.title,
      children: wiki.wiki?.map((subWiki: IWiki) => mapToTree(subWiki)),
    };
    return tree;
  }

  const onSelect = (selectedKeysValue: any, info: any) => {
    setSelectedKeys(selectedKeysValue);
    console.log("Selected node:", info.node);
  };

  const wikiData = useMemo(() => {
    return getWiki.length > 0 ? getWiki.map(mapToTree) : [];
  }, [getWiki]);


  return (
    <Tree
      treeData={wikiData}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onSelect={onSelect}
      // onExpand={setExpandedKeys}
      showLine
      selectable
    />
  );
};

export default TreeComponent;
