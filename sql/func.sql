/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50527
 Source Host           : localhost:3306
 Source Schema         : myweb

 Target Server Type    : MySQL
 Target Server Version : 50527
 File Encoding         : 65001

 Date: 06/09/2019 10:44:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for func
-- ----------------------------
DROP TABLE IF EXISTS `func`;
CREATE TABLE `func`  (
  `fid` int(255) NOT NULL AUTO_INCREMENT,
  `djgn` varchar(255) CHARACTER SET utf8  NULL DEFAULT NULL COMMENT '点击功能',
  `djsj` datetime NULL DEFAULT NULL COMMENT '点击时间',
  PRIMARY KEY (`fid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
