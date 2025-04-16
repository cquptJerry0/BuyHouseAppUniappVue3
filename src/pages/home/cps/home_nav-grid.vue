<template>
    <!-- 功能导航区 -->
    <!-- 热门楼盘 -->
    <view class="home__hot-section">
        <view class="home__section-header">
            <text class="home__section-title">热门楼盘</text>
            <view class="home__section-more">
                <text>更多</text>
                <text class="icon">></text>
            </view>
        </view>

        <!-- 房产列表 -->
        <view class="home__property-list">
            <view class="home__property-item" v-for="(property, index) in properties" :key="index">
                <view class="home__property-image-container">
                    <image :src="property.imageUrl" mode="aspectFill" class="home__property-image" />
                    <view class="home__property-tags">
                        <text v-for="(tag, tagIndex) in property.tags" :key="tagIndex" class="home__property-tag">{{ tag
                        }}</text>
                    </view>
                    <view class="home__property-price" v-if="property.price">
                        <text>{{ property.price }}</text>
                    </view>
                </view>
                <view class="home__property-info">
                    <view class="home__property-title">{{ property.title }}</view>
                    <view class="home__property-location">{{ property.location }}</view>
                    <view class="home__property-features">
                        <view v-for="(feature, featureIndex) in property.features" :key="featureIndex"
                            class="home__property-feature">
                            <text class="home__property-feature-icon" :style="{ backgroundColor: feature.color }">{{
                                feature.icon
                            }}</text>
                            <text class="home__property-feature-text">{{ feature.text }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>


<script setup lang="ts">

</script>

<style lang="scss"></style>
