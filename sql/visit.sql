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

 Date: 06/09/2019 10:44:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for visit
-- ----------------------------
DROP TABLE IF EXISTS `visit`;
CREATE TABLE `visit`  (
  `vid` int(255) NOT NULL AUTO_INCREMENT,
  `fwip` varchar(255) CHARACTER SET utf8  NULL DEFAULT NULL COMMENT '访问ip',
  `fwsj` datetime NULL DEFAULT NULL COMMENT '访问时间',
  `fwcs` int(255) NULL DEFAULT NULL COMMENT '访问此时',
  `fwzd` int(255) NULL DEFAULT NULL COMMENT '访问终端 0、pc端 1、移动端',
  PRIMARY KEY (`vid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8  ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
