---
schema_version: ai4av-public-spec-v1
device_id: mark-levinson/no502-media-console
entity_id: mark_levinson_no502_media_console_north_america
spec_id: admin/mark_levinson-no502_media_console
revision: 1
author: admin
title: "Mark Levinson No502 Media Console Control Spec"
status: published
manufacturer: "Mark Levinson"
manufacturer_key: mark-levinson
model_family: "No502 Media Console"
aliases: []
compatible_with:
  manufacturers:
    - "Mark Levinson"
  models:
    - "No502 Media Console"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: mark_levinson_no502_media_console_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:13:13.597Z
retrieved_at: 2026-04-23T08:13:13.597Z
last_checked_at: 2026-04-23T08:13:13.597Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "Not stated in exported source metadata."
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:13:13.597Z
  matched_actions: 211
  action_count: 211
  confidence: high
  summary: "All 211 spec actions matched command tokens in source; all transport parameters confirmed with verbatim evidence."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Mark Levinson No502 Media Console Control Spec

## Summary

The Mark Levinson No502 Media Console is an AV preamp/processor supporting RS-232 and Ethernet (TCP) control. ASCII-based protocol with message format HDR:SRC:CMD:PARAM terminated by carriage return (0x0D). Supports power control, volume/mute, activity routing, audio profile selection, surround modes, speaker calibration, video resolution, zone 2 control, and system status queries. Notifications are supported for most commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 15003
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: pwr_on
  label: Power On
  kind: action
  params: []

- id: pwr_standby
  label: Power Standby
  kind: action
  params: []

- id: pwr_query
  label: Query Power State
  kind: action
  params: []

- id: pwr_ntf_enable
  label: Enable Power Notifications
  kind: action
  params: []

- id: pwr_ntf_disable
  label: Disable Power Notifications
  kind: action
  params: []

- id: act_set
  label: Set Activity
  kind: action
  params:
    - name: name
      type: string
      description: Activity name (case-sensitive, no quotes)

- id: act_query
  label: Query Current Activity
  kind: action
  params: []

- id: act_ntf_enable
  label: Enable Activity Notifications
  kind: action
  params: []

- id: act_ntf_disable
  label: Disable Activity Notifications
  kind: action
  params: []

- id: aprof_set
  label: Set Audio Profile
  kind: action
  params:
    - name: name
      type: string
      description: Audio profile name (case-sensitive, no quotes)

- id: aprof_query
  label: Query Current Audio Profile
  kind: action
  params: []

- id: aprof_ntf_enable
  label: Enable Audio Profile Notifications
  kind: action
  params: []

- id: aprof_ntf_disable
  label: Disable Audio Profile Notifications
  kind: action
  params: []

- id: vol_set
  label: Set Volume
  kind: action
  params:
    - name: level
      type: number
      description: Volume level 0.0 to 100.0

- id: vol_query
  label: Query Volume
  kind: action
  params: []

- id: vol_ntf_enable
  label: Enable Volume Notifications
  kind: action
  params: []

- id: vol_ntf_disable
  label: Disable Volume Notifications
  kind: action
  params: []

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: mute_query
  label: Query Mute State
  kind: action
  params: []

- id: mute_ntf_enable
  label: Enable Mute Notifications
  kind: action
  params: []

- id: mute_ntf_disable
  label: Disable Mute Notifications
  kind: action
  params: []

- id: bal_set
  label: Set Balance
  kind: action
  params:
    - name: level
      type: number
      description: Balance level -14.0 to 14.0 (0.0 is center)

- id: bal_set_roff
  label: Set Balance Right Off
  kind: action
  params: []

- id: bal_set_loff
  label: Set Balance Left Off
  kind: action
  params: []

- id: bal_query
  label: Query Balance
  kind: action
  params: []

- id: bal_ntf_enable
  label: Enable Balance Notifications
  kind: action
  params: []

- id: bal_ntf_disable
  label: Disable Balance Notifications
  kind: action
  params: []

- id: fader_set
  label: Set Fader
  kind: action
  params:
    - name: level
      type: number
      description: Fader level -14.0 to 14.0

- id: fader_set_foff
  label: Set Fader Front Off
  kind: action
  params: []

- id: fader_set_boff
  label: Set Fader Back Off
  kind: action
  params: []

- id: fader_query
  label: Query Fader
  kind: action
  params: []

- id: fader_ntf_enable
  label: Enable Fader Notifications
  kind: action
  params: []

- id: fader_ntf_disable
  label: Disable Fader Notifications
  kind: action
  params: []

- id: avsync_set
  label: Set AV Sync Delay
  kind: action
  params:
    - name: delay
      type: number
      description: AV sync delay in ms, 0.0 to 500.0

- id: avsync_query
  label: Query AV Sync
  kind: action
  params: []

- id: avsync_ntf_enable
  label: Enable AV Sync Notifications
  kind: action
  params: []

- id: avsync_ntf_disable
  label: Disable AV Sync Notifications
  kind: action
  params: []

- id: dispcfg_set
  label: Set Display Configuration
  kind: action
  params:
    - name: name
      type: string
      description: Display configuration name (case-sensitive, no quotes)

- id: dispcfg_query
  label: Query Display Configuration
  kind: action
  params: []

- id: dispcfg_ntf_enable
  label: Enable Display Config Notifications
  kind: action
  params: []

- id: dispcfg_ntf_disable
  label: Disable Display Config Notifications
  kind: action
  params: []

- id: vprof_set
  label: Set Video Profile
  kind: action
  params:
    - name: name
      type: string
      description: Video profile name (case-sensitive, no quotes)

- id: vprof_query
  label: Query Video Profile
  kind: action
  params: []

- id: vprof_ntf_enable
  label: Enable Video Profile Notifications
  kind: action
  params: []

- id: vprof_ntf_disable
  label: Disable Video Profile Notifications
  kind: action
  params: []

- id: spkrcfg_set
  label: Set Speaker Configuration
  kind: action
  params:
    - name: name
      type: string
      description: Speaker configuration name (case-sensitive, no quotes)

- id: spkrcfg_query
  label: Query Speaker Configuration
  kind: action
  params: []

- id: spkrcfg_ntf_enable
  label: Enable Speaker Config Notifications
  kind: action
  params: []

- id: spkrcfg_ntf_disable
  label: Disable Speaker Config Notifications
  kind: action
  params: []

- id: surrmode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - L7Film
        - L7TV
        - L7Music
        - L7MusicSurr
        - PLIIxMovie
        - PLIIxMusic
        - PLIIMovie
        - PLIIMusic
        - ProLogic
        - dtsNEO6Cinema
        - dtsNEO6Music
        - MultiChan
        - StereoSurr
        - Downmix
        - Stereo
        - MonoLogic
        - MonoSurr
        - Mono

- id: surrmode_query
  label: Query Surround Mode
  kind: action
  params: []

- id: surrmode_ntf_enable
  label: Enable Surround Mode Notifications
  kind: action
  params: []

- id: surrmode_ntf_disable
  label: Disable Surround Mode Notifications
  kind: action
  params: []

- id: resolution_set
  label: Set Resolution
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - SD
        - ED
        - HD720P
        - HD1080I
        - HD1080P

- id: resolution_query
  label: Query Resolution
  kind: action
  params: []

- id: resolution_ntf_enable
  label: Enable Resolution Notifications
  kind: action
  params: []

- id: resolution_ntf_disable
  label: Disable Resolution Notifications
  kind: action
  params: []

- id: encenter_on
  label: Enable Center Speaker
  kind: action
  params: []

- id: encenter_off
  label: Disable Center Speaker
  kind: action
  params: []

- id: encenter_query
  label: Query Center Speaker State
  kind: action
  params: []

- id: encenter_ntf_enable
  label: Enable Center Speaker Notifications
  kind: action
  params: []

- id: encenter_ntf_disable
  label: Disable Center Speaker Notifications
  kind: action
  params: []

- id: ensurr_on
  label: Enable Surround Speakers
  kind: action
  params: []

- id: ensurr_off
  label: Disable Surround Speakers
  kind: action
  params: []

- id: ensurr_query
  label: Query Surround Speakers State
  kind: action
  params: []

- id: ensurr_ntf_enable
  label: Enable Surround Speakers Notifications
  kind: action
  params: []

- id: ensurr_ntf_disable
  label: Disable Surround Speakers Notifications
  kind: action
  params: []

- id: enrear_on
  label: Enable Rear Speakers
  kind: action
  params: []

- id: enrear_off
  label: Disable Rear Speakers
  kind: action
  params: []

- id: enrear_query
  label: Query Rear Speakers State
  kind: action
  params: []

- id: enrear_ntf_enable
  label: Enable Rear Speakers Notifications
  kind: action
  params: []

- id: enrear_ntf_disable
  label: Disable Rear Speakers Notifications
  kind: action
  params: []

- id: ensub1_on
  label: Enable Subwoofer 1
  kind: action
  params: []

- id: ensub1_off
  label: Disable Subwoofer 1
  kind: action
  params: []

- id: ensub1_query
  label: Query Subwoofer 1 State
  kind: action
  params: []

- id: ensub1_ntf_enable
  label: Enable Subwoofer 1 Notifications
  kind: action
  params: []

- id: ensub1_ntf_disable
  label: Disable Subwoofer 1 Notifications
  kind: action
  params: []

- id: ensub2_on
  label: Enable Subwoofer 2
  kind: action
  params: []

- id: ensub2_off
  label: Disable Subwoofer 2
  kind: action
  params: []

- id: ensub2_query
  label: Query Subwoofer 2 State
  kind: action
  params: []

- id: ensub2_ntf_enable
  label: Enable Subwoofer 2 Notifications
  kind: action
  params: []

- id: ensub2_ntf_disable
  label: Disable Subwoofer 2 Notifications
  kind: action
  params: []

- id: roomeqon_on
  label: Room EQ On
  kind: action
  params: []

- id: roomeqon_off
  label: Room EQ Off
  kind: action
  params: []

- id: roomeqon_query
  label: Query Room EQ State
  kind: action
  params: []

- id: roomeqon_ntf_enable
  label: Enable Room EQ Notifications
  kind: action
  params: []

- id: roomeqon_ntf_disable
  label: Disable Room EQ Notifications
  kind: action
  params: []

- id: roomeq_set
  label: Set Room EQ
  kind: action
  params:
    - name: setting
      type: integer
      description: Room EQ setting 1 to 5

- id: roomeq_query
  label: Query Room EQ
  kind: action
  params: []

- id: roomeq_ntf_enable
  label: Enable Room EQ Notifications
  kind: action
  params: []

- id: roomeq_ntf_disable
  label: Disable Room EQ Notifications
  kind: action
  params: []

- id: osd_on
  label: OSD On
  kind: action
  params: []

- id: osd_off
  label: OSD Off
  kind: action
  params: []

- id: osd_query
  label: Query OSD State
  kind: action
  params: []

- id: osd_ntf_enable
  label: Enable OSD Notifications
  kind: action
  params: []

- id: osd_ntf_disable
  label: Disable OSD Notifications
  kind: action
  params: []

- id: monen_on
  label: Monitor Output On
  kind: action
  params: []

- id: monen_off
  label: Monitor Output Off
  kind: action
  params: []

- id: monen_query
  label: Query Monitor Output State
  kind: action
  params: []

- id: menubk_on
  label: Menu Backlight On
  kind: action
  params: []

- id: menubk_off
  label: Menu Backlight Off
  kind: action
  params: []

- id: menubk_query
  label: Query Menu Backlight State
  kind: action
  params: []

- id: fphdispintens_set
  label: Set Front Panel Display Intensity
  kind: action
  params:
    - name: level
      type: enum
      values:
        - OFF
        - LOW
        - MED
        - HIGH

- id: fphdispintens_query
  label: Query Front Panel Display Intensity
  kind: action
  params: []

- id: zoom_set
  label: Set Zoom Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - NORM
        - WIDE
        - FILL
        - FW

- id: zoom_query
  label: Query Zoom Mode
  kind: action
  params: []

- id: zoom_ntf_enable
  label: Enable Zoom Notifications
  kind: action
  params: []

- id: zoom_ntf_disable
  label: Disable Zoom Notifications
  kind: action
  params: []

- id: trigger_1_on
  label: Trigger 1 On
  kind: action
  params: []

- id: trigger_1_off
  label: Trigger 1 Off
  kind: action
  params: []

- id: trigger_1_query
  label: Query Trigger 1 State
  kind: action
  params: []

- id: trigger_2_on
  label: Trigger 2 On
  kind: action
  params: []

- id: trigger_2_off
  label: Trigger 2 Off
  kind: action
  params: []

- id: trigger_2_query
  label: Query Trigger 2 State
  kind: action
  params: []

- id: trigger_3_on
  label: Trigger 3 On
  kind: action
  params: []

- id: trigger_3_off
  label: Trigger 3 Off
  kind: action
  params: []

- id: trigger_3_query
  label: Query Trigger 3 State
  kind: action
  params: []

- id: trigger_4_on
  label: Trigger 4 On
  kind: action
  params: []

- id: trigger_4_off
  label: Trigger 4 Off
  kind: action
  params: []

- id: trigger_4_query
  label: Query Trigger 4 State
  kind: action
  params: []

- id: z2act_set
  label: Set Zone 2 Activity
  kind: action
  params:
    - name: name
      type: string
      description: Zone 2 activity name (case-sensitive, no quotes)

- id: z2act_off
  label: Zone 2 Off
  kind: action
  params: []

- id: z2act_query
  label: Query Zone 2 Activity
  kind: action
  params: []

- id: z2act_ntf_enable
  label: Enable Zone 2 Activity Notifications
  kind: action
  params: []

- id: z2act_ntf_disable
  label: Disable Zone 2 Activity Notifications
  kind: action
  params: []

- id: z2vol_set
  label: Set Zone 2 Volume
  kind: action
  params:
    - name: level
      type: number
      description: Zone 2 volume 0.0 to 100.0

- id: z2vol_query
  label: Query Zone 2 Volume
  kind: action
  params: []

- id: z2vol_ntf_enable
  label: Enable Zone 2 Volume Notifications
  kind: action
  params: []

- id: z2vol_ntf_disable
  label: Disable Zone 2 Volume Notifications
  kind: action
  params: []

- id: xover_frnt_set
  label: Set Front Crossover
  kind: action
  params:
    - name: setting
      type: variant
      description: FULLSUB, FULL, or 30-120 (10Hz increments)

- id: xover_frnt_query
  label: Query Front Crossover
  kind: action
  params: []

- id: xover_frnt_ntf_enable
  label: Enable Front Crossover Notifications
  kind: action
  params: []

- id: xover_frnt_ntf_disable
  label: Disable Front Crossover Notifications
  kind: action
  params: []

- id: xover_center_set
  label: Set Center Crossover
  kind: action
  params:
    - name: setting
      type: variant
      description: FULLSUB, FULL, or 30-120 (10Hz increments)

- id: xover_center_query
  label: Query Center Crossover
  kind: action
  params: []

- id: xover_center_ntf_enable
  label: Enable Center Crossover Notifications
  kind: action
  params: []

- id: xover_center_ntf_disable
  label: Disable Center Crossover Notifications
  kind: action
  params: []

- id: xover_surr_set
  label: Set Surround Crossover
  kind: action
  params:
    - name: setting
      type: variant
      description: FULLSUB, FULL, or 30-120 (10Hz increments)

- id: xover_surr_query
  label: Query Surround Crossover
  kind: action
  params: []

- id: xover_surr_ntf_enable
  label: Enable Surround Crossover Notifications
  kind: action
  params: []

- id: xover_surr_ntf_disable
  label: Disable Surround Crossover Notifications
  kind: action
  params: []

- id: xover_rear_set
  label: Set Rear Crossover
  kind: action
  params:
    - name: setting
      type: variant
      description: FULLSUB, FULL, or 30-120 (10Hz increments)

- id: xover_rear_query
  label: Query Rear Crossover
  kind: action
  params: []

- id: xover_rear_ntf_enable
  label: Enable Rear Crossover Notifications
  kind: action
  params: []

- id: xover_rear_ntf_disable
  label: Disable Rear Crossover Notifications
  kind: action
  params: []

- id: xover_sub_set
  label: Set Subwoofer Crossover
  kind: action
  params:
    - name: setting
      type: enum
      values:
        - FULL
        - COMP

- id: xover_sub_query
  label: Query Subwoofer Crossover
  kind: action
  params: []

- id: xover_sub_ntf_enable
  label: Enable Subwoofer Crossover Notifications
  kind: action
  params: []

- id: xover_sub_ntf_disable
  label: Disable Subwoofer Crossover Notifications
  kind: action
  params: []

- id: offsetf_set
  label: Set Front Offset
  kind: action
  params:
    - name: level
      type: number
      description: Front offset -14.0 to 14.0 or OFF

- id: offsetf_query
  label: Query Front Offset
  kind: action
  params: []

- id: offsetf_ntf_enable
  label: Enable Front Offset Notifications
  kind: action
  params: []

- id: offsetf_ntf_disable
  label: Disable Front Offset Notifications
  kind: action
  params: []

- id: offsetc_set
  label: Set Center Offset
  kind: action
  params:
    - name: level
      type: number
      description: Center offset -14.0 to 14.0 or OFF

- id: offsetc_query
  label: Query Center Offset
  kind: action
  params: []

- id: offsetc_ntf_enable
  label: Enable Center Offset Notifications
  kind: action
  params: []

- id: offsetc_ntf_disable
  label: Disable Center Offset Notifications
  kind: action
  params: []

- id: offsets_set
  label: Set Surround Offset
  kind: action
  params:
    - name: level
      type: number
      description: Surround offset -14.0 to 14.0 or OFF

- id: offsets_query
  label: Query Surround Offset
  kind: action
  params: []

- id: offsets_ntf_enable
  label: Enable Surround Offset Notifications
  kind: action
  params: []

- id: offsets_ntf_disable
  label: Disable Surround Offset Notifications
  kind: action
  params: []

- id: offsetr_set
  label: Set Rear Offset
  kind: action
  params:
    - name: level
      type: number
      description: Rear offset -14.0 to 14.0 or OFF

- id: offsetr_query
  label: Query Rear Offset
  kind: action
  params: []

- id: offsetr_ntf_enable
  label: Enable Rear Offset Notifications
  kind: action
  params: []

- id: offsetr_ntf_disable
  label: Disable Rear Offset Notifications
  kind: action
  params: []

- id: offsetsub1_set
  label: Set Subwoofer 1 Offset
  kind: action
  params:
    - name: level
      type: number
      description: Subwoofer 1 offset -14.0 to 14.0 or OFF

- id: offsetsub1_query
  label: Query Subwoofer 1 Offset
  kind: action
  params: []

- id: offsetsub1_ntf_enable
  label: Enable Subwoofer 1 Offset Notifications
  kind: action
  params: []

- id: offsetsub1_ntf_disable
  label: Disable Subwoofer 1 Offset Notifications
  kind: action
  params: []

- id: offsetsub2_set
  label: Set Subwoofer 2 Offset
  kind: action
  params:
    - name: level
      type: number
      description: Subwoofer 2 offset -14.0 to 14.0 or OFF

- id: offsetsub2_query
  label: Query Subwoofer 2 Offset
  kind: action
  params: []

- id: offsetsub2_ntf_enable
  label: Enable Subwoofer 2 Offset Notifications
  kind: action
  params: []

- id: offsetsub2_ntf_disable
  label: Disable Subwoofer 2 Offset Notifications
  kind: action
  params: []

- id: cal_dist_lf_set
  label: Set Left Front Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_lf_query
  label: Query Left Front Distance
  kind: action
  params: []

- id: cal_dist_rf_set
  label: Set Right Front Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_rf_query
  label: Query Right Front Distance
  kind: action
  params: []

- id: cal_dist_c_set
  label: Set Center Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_c_query
  label: Query Center Distance
  kind: action
  params: []

- id: cal_dist_ls_set
  label: Set Left Surround Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_ls_query
  label: Query Left Surround Distance
  kind: action
  params: []

- id: cal_dist_rs_set
  label: Set Right Surround Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_rs_query
  label: Query Right Surround Distance
  kind: action
  params: []

- id: cal_dist_lb_set
  label: Set Left Back Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_lb_query
  label: Query Left Back Distance
  kind: action
  params: []

- id: cal_dist_rb_set
  label: Set Right Back Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_rb_query
  label: Query Right Back Distance
  kind: action
  params: []

- id: cal_dist_lsub1_set
  label: Set Subwoofer 1 Left Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_lsub1_query
  label: Query Subwoofer 1 Left Distance
  kind: action
  params: []

- id: cal_dist_rsub1_set
  label: Set Subwoofer 1 Right Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_rsub1_query
  label: Query Subwoofer 1 Right Distance
  kind: action
  params: []

- id: cal_dist_lsub2_set
  label: Set Subwoofer 2 Left Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_lsub2_query
  label: Query Subwoofer 2 Left Distance
  kind: action
  params: []

- id: cal_dist_rsub2_set
  label: Set Subwoofer 2 Right Distance
  kind: action
  params:
    - name: distance
      type: number
      description: Distance 0.0 to 40.0 feet

- id: cal_dist_rsub2_query
  label: Query Subwoofer 2 Right Distance
  kind: action
  params: []

- id: cal_lvl_lf_set
  label: Set Left Front Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_lf_query
  label: Query Left Front Level
  kind: action
  params: []

- id: cal_lvl_rf_set
  label: Set Right Front Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_rf_query
  label: Query Right Front Level
  kind: action
  params: []

- id: cal_lvl_c_set
  label: Set Center Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_c_query
  label: Query Center Level
  kind: action
  params: []

- id: cal_lvl_ls_set
  label: Set Left Surround Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_ls_query
  label: Query Left Surround Level
  kind: action
  params: []

- id: cal_lvl_rs_set
  label: Set Right Surround Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_rs_query
  label: Query Right Surround Level
  kind: action
  params: []

- id: cal_lvl_lb_set
  label: Set Left Back Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_lb_query
  label: Query Left Back Level
  kind: action
  params: []

- id: cal_lvl_rb_set
  label: Set Right Back Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_rb_query
  label: Query Right Back Level
  kind: action
  params: []

- id: cal_lvl_lsub1_set
  label: Set Subwoofer 1 Left Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_lsub1_query
  label: Query Subwoofer 1 Left Level
  kind: action
  params: []

- id: cal_lvl_rsub1_set
  label: Set Subwoofer 1 Right Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_rsub1_query
  label: Query Subwoofer 1 Right Level
  kind: action
  params: []

- id: cal_lvl_lsub2_set
  label: Set Subwoofer 2 Left Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_lsub2_query
  label: Query Subwoofer 2 Left Level
  kind: action
  params: []

- id: cal_lvl_rsub2_set
  label: Set Subwoofer 2 Right Level
  kind: action
  params:
    - name: level
      type: number
      description: Level -14.0 to 14.0

- id: cal_lvl_rsub2_query
  label: Query Subwoofer 2 Right Level
  kind: action
  params: []

- id: recall_audioadj
  label: Recall Audio Adjustments
  kind: action
  params: []

- id: req_act_list_query
  label: Query Activity List
  kind: action
  params: []

- id: req_aprof_list_query
  label: Query Audio Profile List
  kind: action
  params: []

- id: req_disp_list_query
  label: Query Display Configuration List
  kind: action
  params: []

- id: req_spkr_list_query
  label: Query Speaker Configuration List
  kind: action
  params: []

- id: req_surr_list_query
  label: Query Surround Mode List
  kind: action
  params: []

- id: req_vprof_list_query
  label: Query Video Profile List
  kind: action
  params: []

- id: status_main_query
  label: Query Main Zone Status
  kind: action
  params: []

- id: status_main_ntf_enable
  label: Enable Main Zone Status Notifications
  kind: action
  params: []

- id: status_main_ntf_disable
  label: Disable Main Zone Status Notifications
  kind: action
  params: []

- id: status_system_query
  label: Query System Status
  kind: action
  params: []

- id: status_zone2_query
  label: Query Zone 2 Status
  kind: action
  params: []

- id: status_zone2_ntf_enable
  label: Enable Zone 2 Status Notifications
  kind: action
  params: []

- id: status_zone2_ntf_disable
  label: Disable Zone 2 Status Notifications
  kind: action
  params: []

- id: ntf_disable_all_temp
  label: Temporarily Disable All Notifications
  kind: action
  params: []

- id: ntf_disable_all_persist
  label: Disable All Notifications Persistently
  kind: action
  params: []

- id: ntf_disable_all_perm
  label: Permanently Disable All Notifications
  kind: action
  params: []

- id: ntf_restore_default
  label: Restore Notification Defaults
  kind: action
  params: []

- id: ntf_restore_lastsaved
  label: Restore Last Saved Notifications
  kind: action
  params: []

- id: fpdwnup_send
  label: Front Panel Button Press
  kind: action
  params:
    - name: button
      type: enum
      values:
        - ZONE
        - PREVIEW
        - DISPLAY
        - SETUP
        - MENU
        - MUTE
        - VIDEO_PROFILE
        - AUDIO_PROFILE
        - SURROUND
        - ENTER
        - STANDBY

- id: fpdwn_send
  label: Front Panel Button Down
  kind: action
  params:
    - name: button
      type: enum
      values:
        - ZONE
        - PREVIEW
        - DISPLAY
        - SETUP
        - MENU
        - MUTE
        - VIDEO_PROFILE
        - AUDIO_PROFILE
        - SURROUND
        - ENTER
        - STANDBY

- id: fpdwn_ntf_enable
  label: Enable Front Panel Down Notifications
  kind: action
  params: []

- id: fpdwn_ntf_disable
  label: Disable Front Panel Down Notifications
  kind: action
  params: []

- id: fprpt_send
  label: Front Panel Repeat
  kind: action
  params:
    - name: button
      type: enum
      values:
        - ZONE
        - PREVIEW
        - DISPLAY
        - SETUP
        - MENU
        - MUTE
        - VIDEO_PROFILE
        - AUDIO_PROFILE
        - SURROUND
        - ENTER
        - STANDBY

- id: fprpt_ntf_enable
  label: Enable Front Panel Repeat Notifications
  kind: action
  params: []

- id: fprpt_ntf_disable
  label: Disable Front Panel Repeat Notifications
  kind: action
  params: []

- id: fpup_send
  label: Front Panel Button Up
  kind: action
  params:
    - name: button
      type: enum
      values:
        - ZONE
        - PREVIEW
        - DISPLAY
        - SETUP
        - MENU
        - MUTE
        - VIDEO_PROFILE
        - AUDIO_PROFILE
        - SURROUND
        - ENTER
        - STANDBY

- id: fpup_ntf_enable
  label: Enable Front Panel Up Notifications
  kind: action
  params: []

- id: fpup_ntf_disable
  label: Disable Front Panel Up Notifications
  kind: action
  params: []

- id: fpact_ctl_cw
  label: Front Panel Activity Control Clockwise
  kind: action
  params: []

- id: fpact_ctl_ccw
  label: Front Panel Activity Control Counter-Clockwise
  kind: action
  params: []

- id: fpact_ctl_ntf_enable
  label: Enable Front Panel Activity Notifications
  kind: action
  params: []

- id: fpact_ctl_ntf_disable
  label: Disable Front Panel Activity Notifications
  kind: action
  params: []

- id: fpvol_ctl_cw
  label: Front Panel Volume Control Clockwise
  kind: action
  params: []

- id: fpvol_ctl_ccw
  label: Front Panel Volume Control Counter-Clockwise
  kind: action
  params: []

- id: fpvol_ctl_cw_fast
  label: Front Panel Volume Control Fast Clockwise
  kind: action
  params: []

- id: fpvol_ctl_ccw_fast
  label: Front Panel Volume Control Fast Counter-Clockwise
  kind: action
  params: []

- id: fpvol_ctl_ntf_enable
  label: Enable Front Panel Volume Notifications
  kind: action
  params: []

- id: fpvol_ctl_ntf_disable
  label: Disable Front Panel Volume Notifications
  kind: action
  params: []

- id: irdwnup_send
  label: IR Button Press and Release
  kind: action
  params:
    - name: button
      type: enum
      values:
        - UP
        - DOWN
        - LEFT
        - RIGHT
        - ENTER
        - MENU
        - SETUP
        - ACTIVITY_UP
        - ACTIVITY_DOWN
        - SURROUND_UP
        - SURROUND_DOWN
        - VOLUME_UP
        - VOLUME_DOWN
        - VIDEO_PROFILE
        - AUDIO_PROFILE
        - PREVIEW
        - MUTE
        - F1
        - F2
        - F3
        - ZONE
        - STANDBY

- id: irdwn_send
  label: IR Button Down
  kind: action
  params:
    - name: button
      type: enum
      values:
        - UP
        - DOWN
        - LEFT
        - RIGHT
        - ENTER
        - MENU
        - SETUP
        - ACTIVITY_UP
        - ACTIVITY_DOWN
        - SURROUND_UP
        - SURROUND_DOWN
        - VOLUME_UP
        - VOLUME_DOWN
        - VIDEO_PROFILE
        - AUDIO_PROFILE
        - PREVIEW
        - MUTE
        - F1
        - F2
        - F3
        - ZONE
        - STANDBY

- id: irdwn_ntf_enable
  label: Enable IR Down Notifications
  kind: action
  params: []

- id: irdwn_ntf_disable
  label: Disable IR Down Notifications
  kind: action
  params: []

- id: irrpt_send
  label: IR Repeat
  kind: action
  params:
    - name: button
      type: enum
      values:
        - UP
        - DOWN
        - LEFT
        - RIGHT
        - ENTER
        - MENU
        - SETUP
        - ACTIVITY_UP
        - ACTIVITY_DOWN
        - SURROUND_UP
        - SURROUND_DOWN
        - VOLUME_UP
        - VOLUME_DOWN
        - VIDEO_PROFILE
        - AUDIO_PROFILE
        - PREVIEW
        - MUTE
        - F1
        - F2
        - F3
        - ZONE
        - STANDBY

- id: irrpt_ntf_enable
  label: Enable IR Repeat Notifications
  kind: action
  params: []

- id: irrpt_ntf_disable
  label: Disable IR Repeat Notifications
  kind: action
  params: []

- id: irup_send
  label: IR Button Up
  kind: action
  params:
    - name: button
      type: enum
      values:
        - UP
        - DOWN
        - LEFT
        - RIGHT
        - ENTER
        - MENU
        - SETUP
        - ACTIVITY_UP
        - ACTIVITY_DOWN
        - SURROUND_UP
        - SURROUND_DOWN
        - VOLUME_UP
        - VOLUME_DOWN
        - VIDEO_PROFILE
        - AUDIO_PROFILE
        - PREVIEW
        - MUTE
        - F1
        - F2
        - F3
        - ZONE
        - STANDBY

- id: irup_ntf_enable
  label: Enable IR Up Notifications
  kind: action
  params: []

- id: irup_ntf_disable
  label: Disable IR Up Notifications
  kind: action
  params: []

- id: nop
  label: No Operation
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - ON
    - STANDBY

- id: activity_name
  type: string

- id: audio_profile_name
  type: string

- id: video_profile_name
  type: string

- id: display_config_name
  type: string

- id: speaker_config_name
  type: string

- id: volume_level
  type: number
  range: [0.0, 100.0]

- id: mute_state
  type: enum
  values:
    - ON
    - OFF

- id: balance_level
  type: number
  range: [-14.0, 14.0]

- id: fader_level
  type: number
  range: [-14.0, 14.0]

- id: avsync_delay
  type: number
  range: [0.0, 500.0]

- id: surround_mode
  type: string

- id: resolution_mode
  type: enum
  values:
    - SD
    - ED
    - HD720P
    - HD1080I
    - HD1080P

- id: zone2_activity
  type: string

- id: zone2_volume
  type: number
  range: [0.0, 100.0]

- id: status_main_response
  type: object
  properties:
    - video_input_resolution
    - output_frame_rate
    - color_space
    - hdcp_status
    - audio_in
    - signal
    - sample_rate
    - input_channels
    - bit_rate
    - ex_encoded
    - encoding_2p0
    - es_encoding
    - dialog_offset
    - mix_room
    - center_mix_level
    - surround_mix_level
    - word_length

- id: status_system_response
  type: object
  properties:
    - model
    - sw_version
    - time_since_powerup

- id: status_zone2_response
  type: object
  properties:
    - signal

- id: activity_list
  type: string

- id: audio_profile_list
  type: string

- id: display_config_list
  type: string

- id: speaker_config_list
  type: string

- id: surround_mode_list
  type: string

- id: video_profile_list
  type: string

- id: notification_state
  type: enum
  values:
    - EN
    - DIS

- id: fault_notification
  type: enum
  values:
    - THERM
    - PWR
    - SIGNAL
    - UNKNOWN
```

## Variables
```yaml
- id: room_eq_on
  type: enum
  values:
    - ON
    - OFF

- id: room_eq_setting
  type: integer
  range: [1, 5]

- id: osd_state
  type: enum
  values:
    - ON
    - OFF

- id: monitor_output_state
  type: enum
  values:
    - ON
    - OFF

- id: menu_backlight_state
  type: enum
  values:
    - ON
    - OFF

- id: front_panel_display_intensity
  type: enum
  values:
    - OFF
    - LOW
    - MED
    - HIGH

- id: center_speaker_enabled
  type: boolean

- id: surround_speakers_enabled
  type: boolean

- id: rear_speakers_enabled
  type: boolean

- id: subwoofer1_enabled
  type: boolean

- id: subwoofer2_enabled
  type: boolean

- id: zoom_mode
  type: enum
  values:
    - NORM
    - WIDE
    - FILL
    - FW

- id: trigger_1_state
  type: enum
  values:
    - ON
    - OFF

- id: trigger_2_state
  type: enum
  values:
    - ON
    - OFF

- id: trigger_3_state
  type: enum
  values:
    - ON
    - OFF

- id: trigger_4_state
  type: enum
  values:
    - ON
    - OFF
```

## Events
```yaml
- id: fault_thermal
  description: Internal fan failed, system overheated
  source: NTF:AV:FAULT:THERM

- id: fault_power
  description: Power fail condition
  source: NTF:AV:FAULT:PWR

- id: fault_signal
  description: General signal fault with ML Net or Link2 devices
  source: NTF:AV:FAULT:SIGNAL

- id: fault_unknown
  description: System software fault occurred
  source: NTF:AV:FAULT:UNKNOWN

- id: power_state_change
  description: Power state changed (ON or STANDBY)
  source: NTF:UI:PWR:ON or NTF:UI:PWR:STANDBY

- id: volume_change
  description: Volume level changed
  source: NTF:UI:VOL:XXX.X

- id: mute_state_change
  description: Mute state changed
  source: NTF:UI:MUTE:ON or NTF:UI:MUTE:OFF
```

## Macros
```yaml
- id: disable_all_notifications_temporary
  label: Temporarily Disable All Notifications
  steps:
    - action: ntf_disable_all_temp

- id: disable_all_notifications_persistent
  label: Disable All Notifications Persistently
  steps:
    - action: ntf_disable_all_persist

- id: restore_notification_defaults
  label: Restore Notification Factory Defaults
  steps:
    - action: ntf_restore_default
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

**Protocol format:** ASCII messages with format `HDR:SRC:CMD:PARAM\r`. Maximum 1024 characters per message including terminator. All fields, commands, and parameters are case-sensitive.

**Response time:** System responds within 500ms. If processing exceeds 500ms, system may respond with WAIT up to 3 times before ERROR.

**Error responses:** RSP:INVALID_SRC, RSP:INVALID_CMD, RSP:INVALID_PRM, RSP:INVALID_STR, RSP:INVALID_NAME, RSP:INVALID_MODE, RSP:NACK (when in standby), RSP:WAIT/ERROR.

**Notification behavior:** Notifications are only sent when enabled per-command. Notifications survive power cycle (stored in database). NTF:DIS_ALL_PERM erases notification database irrevocably.

**Serial config:** 57600 baud, 8 data bits, no parity, 1 stop bit, no flow control. Connector: RJ-11 (pins 2=Rx, 3=Tx, 5=Ground).

**Ethernet config:** TCP port 15003. Default static IP 192.168.50.2. Device acts as server, host as client.

<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: DHCP behavior details not fully specified -->
<!-- UNRESOLVED: specific fault recovery sequences not detailed -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: mark_levinson_no502_media_console_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:13:13.597Z
retrieved_at: 2026-04-23T08:13:13.597Z
last_checked_at: 2026-04-23T08:13:13.597Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:13:13.597Z
matched_actions: 211
action_count: 211
confidence: high
summary: "All 211 spec actions matched command tokens in source; all transport parameters confirmed with verbatim evidence."
```

## Known Gaps

```yaml
[]
```
