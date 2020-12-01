//以画多边形区域的方法画扇形区域 画出以point2点为圆心，半径为radius，夹角从sDegree到eDegree的扇形
function Sector1(point2, radius, sDegree, eDegree, strokeColour, strokeWeight, fillColour, fillOpacity, opts) {
  var points = []; //创建构成多边形的点数组
  var step = ((eDegree - sDegree) / 10) || 10; //根据扇形的总夹角确定每步夹角度数，最大为10
  points.push(point2);
  for (var i = sDegree; i < eDegree + 0.001; i += step) { //循环获取每步的圆弧上点的坐标，存入点数组
    points.push(EOffsetBearing(point2, radius, i));
  }
  points.push(point2);
  //根据构成的点数组以及其他参数画多边形
  var polygon = new BMapGL.Polygon(points, { strokeColor: strokeColour, strokeWeight: strokeWeight,fillColor: fillColour, fillOpacity: fillOpacity });
  /* if (sDegree === eDegree) {
     var planepoint = points[1];
     var myIcon = new BMap.Icon("../images/uav.png",
       new BMap.Size(36, 36));
     var marker = new BMap.Marker(planepoint, {
       icon: myIcon
     });
     var infoWindow = new BMap.InfoWindow("信息:", opts); // 创建信息窗口对象
     marker.addEventListener("click", function () {
       map.openInfoWindow(infoWindow, planepoint); // 开启信息窗口
       //window.external.Test(sDegree);
     });
     map.addOverlay(marker);
   }*/
  return polygon;
}
//使用数学的方法计算需要画扇形的圆弧上的点坐标
function EOffsetBearing(point3, dist, bearing) {
  var lngConv = map.getDistance(point3, new BMapGL.Point(point3.lng + 0.1, point3.lat)) * 10;  //计算1经度与原点的距离
  var latConv = map.getDistance(point3, new BMapGL.Point(point3.lng, point3.lat + 0.1)) * 10;  //计算1纬度与原点的距离
  var lat = dist * Math.sin(bearing * Math.PI / 180) / latConv;  //正弦计算待获取的点的纬度与原点纬度差
  var lng = dist * Math.cos(bearing * Math.PI / 180) / lngConv;  //余弦计算待获取的点的经度与原点经度差
  return new BMapGL.Point(point3.lng + lng, point3.lat + lat);
}
