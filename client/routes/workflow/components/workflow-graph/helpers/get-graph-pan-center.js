import { GRAPH_ZOOM_DEFAULT } from '../constants';

const getGraphPanCenter = ({
  boundingBox,
  height,
  width,
  zoom = GRAPH_ZOOM_DEFAULT,
}) => ({
  x: (width - zoom * (boundingBox.x1 + boundingBox.x2)) / 2,
  y: (height - zoom * (boundingBox.y1 + boundingBox.y2)) / 2,
});

export default getGraphPanCenter;
