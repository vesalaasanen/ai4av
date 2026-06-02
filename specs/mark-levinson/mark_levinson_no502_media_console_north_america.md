---
spec_id: admin/mark-levinson-no502-media-console-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Mark Levinson No502 Media Console Control Spec"
manufacturer: "Mark Levinson"
model_family: "No502 Media Console (North America)"
aliases: []
compatible_with:
  manufacturers:
    - "Mark Levinson"
  models:
    - "No502 Media Console (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - marklevinson.com
source_urls:
  - https://www.marklevinson.com/on/demandware.static/-/Sites-ML-US-NCOM-Library/default/dw3b18792f/glp/support/downloads/No502/Mark-Levinson-No502-Serial-Protocol.pdf
retrieved_at: 2026-04-30T04:26:55.366Z
last_checked_at: 2026-06-02T05:46:07.837Z
generated_at: 2026-06-02T05:46:07.837Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, factory default activity/audio profile/video profile/display configuration/speaker configuration names not enumerated in source"
  - "source describes settable numeric/string parameters inline (e.g. VOL 0.0-100.0,"
  - "source describes the FPDWNUP/IRDWNUP composite commands and the FPRPT/IRRPT"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "factory default activity names, audio profile names, video profile names, display configuration names, and speaker configuration names are not enumerated in the source; they are user-editable pre-configured values. Firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:07.837Z
  matched_actions: 292
  action_count: 292
  confidence: medium
  summary: "All 292 spec action units matched verbatim to the 88 source commands (88 opcodes × set/query/notification variants); transport values port 15003, baud 57600, 8N1 all confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Mark Levinson No502 Media Console Control Spec

## Summary
ASCII command protocol for the Mark Levinson No502 Media Console (North America). External host controllers send/receive structured ASCII messages of the form `HDR:SRC:CMD:PARAM\r` over either RS-232 (RJ-11, 57600 8N1) or TCP (RJ-45, port 15003). The protocol covers 88 distinct command opcodes for power, volume, surround mode, video resolution, speaker calibration, triggers, Zone 2 control, and per-key front-panel/IR simulation.

<!-- UNRESOLVED: firmware version compatibility, factory default activity/audio profile/video profile/display configuration/speaker configuration names not enumerated in source -->

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
  type: none  # inferred: no auth procedure in source
```

**Message framing (applies to both transports):** `HDR:SRC:CMD:PARAM\r` where `\r` = 0x0D. Fields are case sensitive and colon separated. HDR ∈ {RQST, RSP, NTF}. SRC ∈ {CS, UI, AV}. Maximum 1024 characters per message. Host must wait for ACK within 500ms; up to 3 WAIT responses precede ERROR.

**Serial (RS-232) via RJ-11:** pin 2 Rx, pin 3 Tx, pin 5 ground. Cable must cross Tx↔Rx. Default control port = Ethernet; RS-232 selectable via Setup → User Options → Control Options → External Control.

**TCP via RJ-45:** protocol TCP, No502 = server, host = client. Default static IP 192.168.50.2 / mask 255.255.0.0 if DHCP disabled. DHCP is factory default. 10/100 BaseT, half/full duplex, flow & pause control supported (auto-negotiate, not user adjustable).

## Traits
```yaml
- powerable       # inferred from PWR:ON / PWR:STANDBY commands
- routable        # inferred from input/speaker/display configuration commands (ACT, APROF, SPKRCFG, DISPCFG, VPROF, Z2ACT)
- queryable       # inferred from extensive ? query commands (PWR?, VOL?, STATUS_MAIN?, REQ_*_LIST?, etc.)
- levelable       # inferred from volume (VOL, Z2VOL), trim (CAL_LVL_*), balance (BAL), fader (FADER), and offset (OFFSET*) commands
```

## Actions
```yaml
- id: act_select
  label: Select Activity
  kind: action
  command: "RQST:CS:ACT:\"{name}\"\r"
  params:
    - name: name
      type: string
      description: Case sensitive name of the activity in the system database. Do not include the surrounding quotes literally.

- id: act_query
  label: Query Current Activity
  kind: query
  command: "RQST:CS:ACT:?\r"
  params: []

- id: act_notification_enable
  label: Enable Activity Change Notifications
  kind: action
  command: "RQST:CS:ACT:EN\r"
  params: []

- id: act_notification_disable
  label: Disable Activity Change Notifications
  kind: action
  command: "RQST:CS:ACT:DIS\r"
  params: []

- id: act_notification_query
  label: Query Activity Notification State
  kind: query
  command: "RQST:CS:ACT:NTF?\r"
  params: []

- id: aprof_select
  label: Select Audio Profile
  kind: action
  command: "RQST:CS:APROF:\"{name}\"\r"
  params:
    - name: name
      type: string
      description: Case sensitive name of the audio profile in the system database.

- id: aprof_query
  label: Query Current Audio Profile
  kind: query
  command: "RQST:CS:APROF:?\r"
  params: []

- id: aprof_notification_enable
  label: Enable Audio Profile Change Notifications
  kind: action
  command: "RQST:CS:APROF:EN\r"
  params: []

- id: aprof_notification_disable
  label: Disable Audio Profile Change Notifications
  kind: action
  command: "RQST:CS:APROF:DIS\r"
  params: []

- id: aprof_notification_query
  label: Query Audio Profile Notification State
  kind: query
  command: "RQST:CS:APROF:NTF?\r"
  params: []

- id: avsync_set
  label: Set AV Sync Delay
  kind: action
  command: "RQST:CS:AVSYNC:{value}\r"
  params:
    - name: value
      type: number
      description: AV sync delay in milliseconds, range 0.0-500.0.

- id: avsync_query
  label: Query Current AV Sync Value
  kind: query
  command: "RQST:CS:AVSYNC:?\r"
  params: []

- id: avsync_notification_enable
  label: Enable AV Sync Change Notifications
  kind: action
  command: "RQST:CS:AVSYNC:EN\r"
  params: []

- id: avsync_notification_disable
  label: Disable AV Sync Change Notifications
  kind: action
  command: "RQST:CS:AVSYNC:DIS\r"
  params: []

- id: avsync_notification_query
  label: Query AV Sync Notification State
  kind: query
  command: "RQST:CS:AVSYNC:NTF?\r"
  params: []

- id: bal_set
  label: Set Balance
  kind: action
  command: "RQST:CS:BAL:{value}\r"
  params:
    - name: value
      type: string
      description: One of ROFF, LOFF, or a numeric level in -14.0 to 14.0.

- id: bal_query
  label: Query Current Balance
  kind: query
  command: "RQST:CS:BAL:?\r"
  params: []

- id: bal_notification_enable
  label: Enable Balance Change Notifications
  kind: action
  command: "RQST:CS:BAL:EN\r"
  params: []

- id: bal_notification_disable
  label: Disable Balance Change Notifications
  kind: action
  command: "RQST:CS:BAL:DIS\r"
  params: []

- id: bal_notification_query
  label: Query Balance Notification State
  kind: query
  command: "RQST:CS:BAL:NTF?\r"
  params: []

- id: cal_dist_lf_set
  label: Set Left Front Speaker Distance
  kind: action
  command: "RQST:CS:CAL_DIST_LF:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0. Always reported in feet regardless of system setting.

- id: cal_dist_lf_query
  label: Query Left Front Speaker Distance
  kind: query
  command: "RQST:CS:CAL_DIST_LF:?\r"
  params: []

- id: cal_dist_rf_set
  label: Set Right Front Speaker Distance
  kind: action
  command: "RQST:CS:CAL_DIST_RF:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_rf_query
  label: Query Right Front Speaker Distance
  kind: query
  command: "RQST:CS:CAL_DIST_RF:?\r"
  params: []

- id: cal_dist_c_set
  label: Set Center Speaker Distance
  kind: action
  command: "RQST:CS:CAL_DIST_C:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_c_query
  label: Query Center Speaker Distance
  kind: query
  command: "RQST:CS:CAL_DIST_C:?\r"
  params: []

- id: cal_dist_ls_set
  label: Set Left Surround Speaker Distance
  kind: action
  command: "RQST:CS:CAL_DIST_LS:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_ls_query
  label: Query Left Surround Speaker Distance
  kind: query
  command: "RQST:CS:CAL_DIST_LS:?\r"
  params: []

- id: cal_dist_rs_set
  label: Set Right Surround Speaker Distance
  kind: action
  command: "RQST:CS:CAL_DIST_RS:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_rs_query
  label: Query Right Surround Speaker Distance
  kind: query
  command: "RQST:CS:CAL_DIST_RS:?\r"
  params: []

- id: cal_dist_lb_set
  label: Set Left Back Speaker Distance
  kind: action
  command: "RQST:CS:CAL_DIST_LB:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_lb_query
  label: Query Left Back Speaker Distance
  kind: query
  command: "RQST:CS:CAL_DIST_LB:?\r"
  params: []

- id: cal_dist_rb_set
  label: Set Right Back Speaker Distance
  kind: action
  command: "RQST:CS:CAL_DIST_RB:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_rb_query
  label: Query Right Back Speaker Distance
  kind: query
  command: "RQST:CS:CAL_DIST_RB:?\r"
  params: []

- id: cal_dist_lsub1_set
  label: Set Left Subwoofer 1 Distance
  kind: action
  command: "RQST:CS:CAL_DIST_LSUB1:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_lsub1_query
  label: Query Left Subwoofer 1 Distance
  kind: query
  command: "RQST:CS:CAL_DIST_LSUB1:?\r"
  params: []

- id: cal_dist_rsub1_set
  label: Set Right Subwoofer 1 Distance
  kind: action
  command: "RQST:CS:CAL_DIST_RSUB1:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_rsub1_query
  label: Query Right Subwoofer 1 Distance
  kind: query
  command: "RQST:CS:CAL_DIST_RSUB1:?\r"
  params: []

- id: cal_dist_lsub2_set
  label: Set Left Subwoofer 2 Distance
  kind: action
  command: "RQST:CS:CAL_DIST_LSUB2:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_lsub2_query
  label: Query Left Subwoofer 2 Distance
  kind: query
  command: "RQST:CS:CAL_DIST_LSUB2:?\r"
  params: []

- id: cal_dist_rsub2_set
  label: Set Right Subwoofer 2 Distance
  kind: action
  command: "RQST:CS:CAL_DIST_RSUB2:{value}\r"
  params:
    - name: value
      type: number
      description: Distance in feet, 0.0 to 40.0.

- id: cal_dist_rsub2_query
  label: Query Right Subwoofer 2 Distance
  kind: query
  command: "RQST:CS:CAL_DIST_RSUB2:?\r"
  params: []

- id: cal_lvl_lf_set
  label: Set Left Front Speaker Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_LF:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_lf_query
  label: Query Left Front Speaker Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_LF:?\r"
  params: []

- id: cal_lvl_rf_set
  label: Set Right Front Speaker Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_RF:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_rf_query
  label: Query Right Front Speaker Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_RF:?\r"
  params: []

- id: cal_lvl_c_set
  label: Set Center Speaker Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_C:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_c_query
  label: Query Center Speaker Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_C:?\r"
  params: []

- id: cal_lvl_ls_set
  label: Set Left Surround Speaker Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_LS:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_ls_query
  label: Query Left Surround Speaker Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_LS:?\r"
  params: []

- id: cal_lvl_rs_set
  label: Set Right Surround Speaker Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_RS:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_rs_query
  label: Query Right Surround Speaker Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_RS:?\r"
  params: []

- id: cal_lvl_lb_set
  label: Set Left Back Speaker Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_LB:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_lb_query
  label: Query Left Back Speaker Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_LB:?\r"
  params: []

- id: cal_lvl_rb_set
  label: Set Right Back Speaker Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_RB:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_rb_query
  label: Query Right Back Speaker Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_RB:?\r"
  params: []

- id: cal_lvl_lsub1_set
  label: Set Left Subwoofer 1 Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_LSUB1:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_lsub1_query
  label: Query Left Subwoofer 1 Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_LSUB1:?\r"
  params: []

- id: cal_lvl_rsub1_set
  label: Set Right Subwoofer 1 Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_RSUB1:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_rsub1_query
  label: Query Right Subwoofer 1 Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_RSUB1:?\r"
  params: []

- id: cal_lvl_lsub2_set
  label: Set Left Subwoofer 2 Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_LSUB2:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_lsub2_query
  label: Query Left Subwoofer 2 Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_LSUB2:?\r"
  params: []

- id: cal_lvl_rsub2_set
  label: Set Right Subwoofer 2 Level Trim
  kind: action
  command: "RQST:CS:CAL_LVL_RSUB2:{value}\r"
  params:
    - name: value
      type: number
      description: Level in dB, -14.0 to 14.0.

- id: cal_lvl_rsub2_query
  label: Query Right Subwoofer 2 Level Trim
  kind: query
  command: "RQST:CS:CAL_LVL_RSUB2:?\r"
  params: []

- id: dispcfg_select
  label: Select Display Configuration
  kind: action
  command: "RQST:CS:DISPCFG:\"{name}\"\r"
  params:
    - name: name
      type: string
      description: Case sensitive name of the display configuration in the system database.

- id: dispcfg_query
  label: Query Current Display Configuration
  kind: query
  command: "RQST:CS:DISPCFG:?\r"
  params: []

- id: dispcfg_notification_enable
  label: Enable Display Configuration Notifications
  kind: action
  command: "RQST:CS:DISPCFG:EN\r"
  params: []

- id: dispcfg_notification_disable
  label: Disable Display Configuration Notifications
  kind: action
  command: "RQST:CS:DISPCFG:DIS\r"
  params: []

- id: dispcfg_notification_query
  label: Query Display Configuration Notification State
  kind: query
  command: "RQST:CS:DISPCFG:NTF?\r"
  params: []

- id: encenter_set
  label: Enable/Disable Center Speaker
  kind: action
  command: "RQST:CS:ENCENTER:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: encenter_query
  label: Query Center Speaker Enable State
  kind: query
  command: "RQST:CS:ENCENTER:?\r"
  params: []

- id: encenter_notification_enable
  label: Enable Center Speaker Change Notifications
  kind: action
  command: "RQST:CS:ENCENTER:EN\r"
  params: []

- id: encenter_notification_disable
  label: Disable Center Speaker Change Notifications
  kind: action
  command: "RQST:CS:ENCENTER:DIS\r"
  params: []

- id: encenter_notification_query
  label: Query Center Speaker Notification State
  kind: query
  command: "RQST:CS:ENCENTER:NTF?\r"
  params: []

- id: ensurr_set
  label: Enable/Disable Surround Speakers
  kind: action
  command: "RQST:CS:ENSURR:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: ensurr_query
  label: Query Surround Speaker Enable State
  kind: query
  command: "RQST:CS:ENSURR:?\r"
  params: []

- id: ensurr_notification_enable
  label: Enable Surround Speaker Change Notifications
  kind: action
  command: "RQST:CS:ENSURR:EN\r"
  params: []

- id: ensurr_notification_disable
  label: Disable Surround Speaker Change Notifications
  kind: action
  command: "RQST:CS:ENSURR:DIS\r"
  params: []

- id: ensurr_notification_query
  label: Query Surround Speaker Notification State
  kind: query
  command: "RQST:CS:ENSURR:NTF?\r"
  params: []

- id: enrear_set
  label: Enable/Disable Rear Speakers
  kind: action
  command: "RQST:CS:ENREAR:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: enrear_query
  label: Query Rear Speaker Enable State
  kind: query
  command: "RQST:CS:ENREAR:?\r"
  params: []

- id: enrear_notification_enable
  label: Enable Rear Speaker Change Notifications
  kind: action
  command: "RQST:CS:ENREAR:EN\r"
  params: []

- id: enrear_notification_disable
  label: Disable Rear Speaker Change Notifications
  kind: action
  command: "RQST:CS:ENREAR:DIS\r"
  params: []

- id: enrear_notification_query
  label: Query Rear Speaker Notification State
  kind: query
  command: "RQST:CS:ENREAR:NTF?\r"
  params: []

- id: ensub1_set
  label: Enable/Disable Subwoofer 1
  kind: action
  command: "RQST:CS:ENSUB1:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: ensub1_query
  label: Query Subwoofer 1 Enable State
  kind: query
  command: "RQST:CS:ENSUB1:?\r"
  params: []

- id: ensub1_notification_enable
  label: Enable Subwoofer 1 Change Notifications
  kind: action
  command: "RQST:CS:ENSUB1:EN\r"
  params: []

- id: ensub1_notification_disable
  label: Disable Subwoofer 1 Change Notifications
  kind: action
  command: "RQST:CS:ENSUB1:DIS\r"
  params: []

- id: ensub1_notification_query
  label: Query Subwoofer 1 Notification State
  kind: query
  command: "RQST:CS:ENSUB1:NTF?\r"
  params: []

- id: ensub2_set
  label: Enable/Disable Subwoofer 2
  kind: action
  command: "RQST:CS:ENSUB2:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: ensub2_query
  label: Query Subwoofer 2 Enable State
  kind: query
  command: "RQST:CS:ENSUB2:?\r"
  params: []

- id: ensub2_notification_enable
  label: Enable Subwoofer 2 Change Notifications
  kind: action
  command: "RQST:CS:ENSUB2:EN\r"
  params: []

- id: ensub2_notification_disable
  label: Disable Subwoofer 2 Change Notifications
  kind: action
  command: "RQST:CS:ENSUB2:DIS\r"
  params: []

- id: ensub2_notification_query
  label: Query Subwoofer 2 Notification State
  kind: query
  command: "RQST:CS:ENSUB2:NTF?\r"
  params: []

- id: fader_set
  label: Set Fader
  kind: action
  command: "RQST:CS:FADER:{value}\r"
  params:
    - name: value
      type: string
      description: One of FOFF, BOFF, or a numeric level in -14.0 to 14.0.

- id: fader_query
  label: Query Current Fader Setting
  kind: query
  command: "RQST:CS:FADER:?\r"
  params: []

- id: fader_notification_enable
  label: Enable Fader Change Notifications
  kind: action
  command: "RQST:CS:FADER:EN\r"
  params: []

- id: fader_notification_disable
  label: Disable Fader Change Notifications
  kind: action
  command: "RQST:CS:FADER:DIS\r"
  params: []

- id: fader_notification_query
  label: Query Fader Notification State
  kind: query
  command: "RQST:CS:FADER:NTF?\r"
  params: []

- id: fpdispintens_set
  label: Set Front Panel Display Intensity
  kind: action
  command: "RQST:CS:FPDISPINTENS:{level}\r"
  params:
    - name: level
      type: enum
      values: [OFF, LOW, MED, HIGH]

- id: fpdispintens_query
  label: Query Front Panel Display Intensity
  kind: query
  command: "RQST:CS:FPDISPINTENS:?\r"
  params: []

- id: fpdwnup
  label: Front Panel Button Press Down and Release
  kind: action
  command: "RQST:CS:FPDWNUP:{key}\r"
  params:
    - name: key
      type: enum
      values: [ZONE, PREVIEW, DISPLAY, SETUP, MENU, MUTE, VIDEO_PROFILE, AUDIO_PROFILE, SURROUND, ENTER, STANDBY]
      description: One of 11 front-panel keys. Equivalent to FPDWN immediately followed by FPUP.

- id: fpdwn
  label: Front Panel Button Press Down
  kind: action
  command: "RQST:CS:FPDWN:{key}\r"
  params:
    - name: key
      type: enum
      values: [ZONE, PREVIEW, DISPLAY, SETUP, MENU, MUTE, VIDEO_PROFILE, AUDIO_PROFILE, SURROUND, ENTER, STANDBY]

- id: fpdwn_notification_enable
  label: Enable FPDWN Notifications
  kind: action
  command: "RQST:CS:FPDWN:EN\r"
  params: []

- id: fpdwn_notification_disable
  label: Disable FPDWN Notifications
  kind: action
  command: "RQST:CS:FPDWN:DIS\r"
  params: []

- id: fpdwn_notification_query
  label: Query FPDWN Notification State
  kind: query
  command: "RQST:CS:FPDWN:NTF?\r"
  params: []

- id: fprpt
  label: Front Panel Button Held Down (Repeat)
  kind: action
  command: "RQST:CS:FPRPT:{key}\r"
  params:
    - name: key
      type: enum
      values: [ZONE, PREVIEW, DISPLAY, SETUP, MENU, MUTE, VIDEO_PROFILE, AUDIO_PROFILE, SURROUND, ENTER, STANDBY]
      description: Simulates holding the key down. Buffered; number of repeats needed varies by resource (e.g. 5 then 3 to repeat inside Setup).

- id: fprpt_notification_enable
  label: Enable FPRPT Notifications
  kind: action
  command: "RQST:CS:FPRPT:EN\r"
  params: []

- id: fprpt_notification_disable
  label: Disable FPRPT Notifications
  kind: action
  command: "RQST:CS:FPRPT:DIS\r"
  params: []

- id: fprpt_notification_query
  label: Query FPRPT Notification State
  kind: query
  command: "RQST:CS:FPRPT:NTF?\r"
  params: []

- id: fpup
  label: Front Panel Button Release
  kind: action
  command: "RQST:CS:FPUP:{key}\r"
  params:
    - name: key
      type: enum
      values: [ZONE, PREVIEW, DISPLAY, SETUP, MENU, MUTE, VIDEO_PROFILE, AUDIO_PROFILE, SURROUND, ENTER, STANDBY]

- id: fpup_notification_enable
  label: Enable FPUP Notifications
  kind: action
  command: "RQST:CS:FPUP:EN\r"
  params: []

- id: fpup_notification_disable
  label: Disable FPUP Notifications
  kind: action
  command: "RQST:CS:FPUP:DIS\r"
  params: []

- id: fpup_notification_query
  label: Query FPUP Notification State
  kind: query
  command: "RQST:CS:FPUP:NTF?\r"
  params: []

- id: fpact_ctl
  label: Front Panel Activity Rotator
  kind: action
  command: "RQST:CS:FPACT_CTL:{direction}\r"
  params:
    - name: direction
      type: enum
      values: [CW, CCW]

- id: fpact_ctl_notification_enable
  label: Enable FPACT_CTL Notifications
  kind: action
  command: "RQST:CS:FPACT_CTL:EN\r"
  params: []

- id: fpact_ctl_notification_disable
  label: Disable FPACT_CTL Notifications
  kind: action
  command: "RQST:CS:FPACT_CTL:DIS\r"
  params: []

- id: fpact_ctl_notification_query
  label: Query FPACT_CTL Notification State
  kind: query
  command: "RQST:CS:FPACT_CTL:NTF?\r"
  params: []

- id: fpvol_ctl
  label: Front Panel Volume Rotator
  kind: action
  command: "RQST:CS:FPVOL_CTL:{direction}\r"
  params:
    - name: direction
      type: enum
      values: [CW, CCW, CW_FAST, CCW_FAST]
      description: CW_FAST/CCW_FAST simulate faster movement.

- id: fpvol_ctl_notification_enable
  label: Enable FPVOL_CTL Notifications
  kind: action
  command: "RQST:CS:FPVOL_CTL:EN\r"
  params: []

- id: fpvol_ctl_notification_disable
  label: Disable FPVOL_CTL Notifications
  kind: action
  command: "RQST:CS:FPVOL_CTL:DIS\r"
  params: []

- id: fpvol_ctl_notification_query
  label: Query FPVOL_CTL Notification State
  kind: query
  command: "RQST:CS:FPVOL_CTL:NTF?\r"
  params: []

- id: irdwnup
  label: IR Button Press Down and Release
  kind: action
  command: "RQST:CS:IRDWNUP:{key}\r"
  params:
    - name: key
      type: enum
      values: [UP, DOWN, LEFT, RIGHT, ENTER, MENU, SETUP, ACTIVITY_UP, ACTIVITY_DOWN, SURROUND_UP, SURROUND_DOWN, VOLUME_UP, VOLUME_DOWN, VIDEO_PROFILE, AUDIO_PROFILE, PREVIEW, MUTE, F1, F2, F3, ZONE, STANDBY]
      description: One of 22 IR remote keys. Equivalent to IRDWN immediately followed by IRUP.

- id: irdwn
  label: IR Button Press Down
  kind: action
  command: "RQST:CS:IRDWN:{key}\r"
  params:
    - name: key
      type: enum
      values: [UP, DOWN, LEFT, RIGHT, ENTER, MENU, SETUP, ACTIVITY_UP, ACTIVITY_DOWN, SURROUND_UP, SURROUND_DOWN, VOLUME_UP, VOLUME_DOWN, VIDEO_PROFILE, AUDIO_PROFILE, PREVIEW, MUTE, F1, F2, F3, ZONE, STANDBY]

- id: irdwn_notification_enable
  label: Enable IRDWN Notifications
  kind: action
  command: "RQST:CS:IRDWN:EN\r"
  params: []

- id: irdwn_notification_disable
  label: Disable IRDWN Notifications
  kind: action
  command: "RQST:CS:IRDWN:DIS\r"
  params: []

- id: irdwn_notification_query
  label: Query IRDWN Notification State
  kind: query
  command: "RQST:CS:IRDWN:NTF?\r"
  params: []

- id: irrpt
  label: IR Button Repeat (Held)
  kind: action
  command: "RQST:CS:IRRPT:{key}\r"
  params:
    - name: key
      type: enum
      values: [UP, DOWN, LEFT, RIGHT, ENTER, MENU, SETUP, ACTIVITY_UP, ACTIVITY_DOWN, SURROUND_UP, SURROUND_DOWN, VOLUME_UP, VOLUME_DOWN, VIDEO_PROFILE, AUDIO_PROFILE, PREVIEW, MUTE, F1, F2, F3, ZONE, STANDBY]
      description: Simulates holding the IR key down. Buffered; number of repeats varies (e.g. 5 then 3 in Setup).

- id: irrpt_notification_enable
  label: Enable IRRPT Notifications
  kind: action
  command: "RQST:CS:IRRPT:EN\r"
  params: []

- id: irrpt_notification_disable
  label: Disable IRRPT Notifications
  kind: action
  command: "RQST:CS:IRRPT:DIS\r"
  params: []

- id: irrpt_notification_query
  label: Query IRRPT Notification State
  kind: query
  command: "RQST:CS:IRRPT:NTF?\r"
  params: []

- id: irup
  label: IR Button Release
  kind: action
  command: "RQST:CS:IRUP:{key}\r"
  params:
    - name: key
      type: enum
      values: [UP, DOWN, LEFT, RIGHT, ENTER, MENU, SETUP, ACTIVITY_UP, ACTIVITY_DOWN, SURROUND_UP, SURROUND_DOWN, VOLUME_UP, VOLUME_DOWN, VIDEO_PROFILE, AUDIO_PROFILE, PREVIEW, MUTE, F1, F2, F3, ZONE, STANDBY]

- id: irup_notification_enable
  label: Enable IRUP Notifications
  kind: action
  command: "RQST:CS:IRUP:EN\r"
  params: []

- id: irup_notification_disable
  label: Disable IRUP Notifications
  kind: action
  command: "RQST:CS:IRUP:DIS\r"
  params: []

- id: irup_notification_query
  label: Query IRUP Notification State
  kind: query
  command: "RQST:CS:IRUP:NTF?\r"
  params: []

- id: menubk_set
  label: Set Menu Backlight
  kind: action
  command: "RQST:CS:MENUBK:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: menubk_query
  label: Query Menu Backlight State
  kind: query
  command: "RQST:CS:MENUBK:?\r"
  params: []

- id: monen_set
  label: Set Monitor Output
  kind: action
  command: "RQST:CS:MONEN:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: monen_query
  label: Query Monitor Output State
  kind: query
  command: "RQST:CS:MONEN:?\r"
  params: []

- id: mute_set
  label: Set Mute
  kind: action
  command: "RQST:CS:MUTE:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: mute_query
  label: Query Mute State
  kind: query
  command: "RQST:CS:MUTE:?\r"
  params: []

- id: mute_notification_enable
  label: Enable Mute Change Notifications
  kind: action
  command: "RQST:CS:MUTE:EN\r"
  params: []

- id: mute_notification_disable
  label: Disable Mute Change Notifications
  kind: action
  command: "RQST:CS:MUTE:DIS\r"
  params: []

- id: mute_notification_query
  label: Query Mute Notification State
  kind: query
  command: "RQST:CS:MUTE:NTF?\r"
  params: []

- id: nop
  label: No Operation (Communication Test)
  kind: action
  command: "RQST:CS:NOP:NOP\r"
  params: []

- id: ntf_disable_all_temp
  label: Disable All Notifications Temporarily
  kind: action
  command: "RQST:CS:NTF:DIS_ALL_TEMP\r"
  params: []
  notes: All system notifications disabled for the current session; restored on power state change.

- id: ntf_disable_all_persist
  label: Disable All Notifications Persistently
  kind: action
  command: "RQST:CS:NTF:DIS_ALL_PERSIST\r"
  params: []
  notes: Survives power cycles. Must be cleared with NTF:RESTORE_*.

- id: ntf_disable_all_perm
  label: Disable All Notifications Permanently
  kind: action
  command: "RQST:CS:NTF:DIS_ALL_PERM\r"
  params: []
  notes: Irrevocably erases the External Protocol Notification database. Only RESTORE_DEFAULT can recover.

- id: ntf_restore_default
  label: Restore All Notifications to Factory Defaults
  kind: action
  command: "RQST:CS:NTF:RESTORE_DEFAULT\r"
  params: []
  notes: Only restores the External Protocol Notification database, not the full system database.

- id: ntf_restore_last_saved
  label: Restore All Notifications to Last Saved State
  kind: action
  command: "RQST:CS:NTF:RESTORE_LAST_SAVED\r"
  params: []

- id: offsetf_set
  label: Set Front Speaker Offset
  kind: action
  command: "RQST:CS:OFFSETF:{value}\r"
  params:
    - name: value
      type: string
      description: OFF or numeric level in -14.0 to 14.0.

- id: offsetf_query
  label: Query Front Speaker Offset
  kind: query
  command: "RQST:CS:OFFSETF:?\r"
  params: []

- id: offsetf_notification_enable
  label: Enable OFFSETF Notifications
  kind: action
  command: "RQST:CS:OFFSETF:EN\r"
  params: []

- id: offsetf_notification_disable
  label: Disable OFFSETF Notifications
  kind: action
  command: "RQST:CS:OFFSETF:DIS\r"
  params: []

- id: offsetf_notification_query
  label: Query OFFSETF Notification State
  kind: query
  command: "RQST:CS:OFFSETF:NTF?\r"
  params: []

- id: offsetc_set
  label: Set Center Speaker Offset
  kind: action
  command: "RQST:CS:OFFSETC:{value}\r"
  params:
    - name: value
      type: string
      description: OFF or numeric level in -14.0 to 14.0.

- id: offsetc_query
  label: Query Center Speaker Offset
  kind: query
  command: "RQST:CS:OFFSETC:?\r"
  params: []

- id: offsetc_notification_enable
  label: Enable OFFSETC Notifications
  kind: action
  command: "RQST:CS:OFFSETC:EN\r"
  params: []

- id: offsetc_notification_disable
  label: Disable OFFSETC Notifications
  kind: action
  command: "RQST:CS:OFFSETC:DIS\r"
  params: []

- id: offsetc_notification_query
  label: Query OFFSETC Notification State
  kind: query
  command: "RQST:CS:OFFSETC:NTF?\r"
  params: []

- id: offsets_set
  label: Set Surround Speaker Offset
  kind: action
  command: "RQST:CS:OFFSETS:{value}\r"
  params:
    - name: value
      type: string
      description: OFF or numeric level in -14.0 to 14.0.

- id: offsets_query
  label: Query Surround Speaker Offset
  kind: query
  command: "RQST:CS:OFFSETS:?\r"
  params: []

- id: offsets_notification_enable
  label: Enable OFFSETS Notifications
  kind: action
  command: "RQST:CS:OFFSETS:EN\r"
  params: []

- id: offsets_notification_disable
  label: Disable OFFSETS Notifications
  kind: action
  command: "RQST:CS:OFFSETS:DIS\r"
  params: []

- id: offsets_notification_query
  label: Query OFFSETS Notification State
  kind: query
  command: "RQST:CS:OFFSETS:NTF?\r"
  params: []

- id: offsetr_set
  label: Set Rear Speaker Offset
  kind: action
  command: "RQST:CS:OFFSETR:{value}\r"
  params:
    - name: value
      type: string
      description: OFF or numeric level in -14.0 to 14.0.

- id: offsetr_query
  label: Query Rear Speaker Offset
  kind: query
  command: "RQST:CS:OFFSETR:?\r"
  params: []

- id: offsetr_notification_enable
  label: Enable OFFSETR Notifications
  kind: action
  command: "RQST:CS:OFFSETR:EN\r"
  params: []

- id: offsetr_notification_disable
  label: Disable OFFSETR Notifications
  kind: action
  command: "RQST:CS:OFFSETR:DIS\r"
  params: []

- id: offsetr_notification_query
  label: Query OFFSETR Notification State
  kind: query
  command: "RQST:CS:OFFSETR:NTF?\r"
  params: []

- id: offsetsub1_set
  label: Set Subwoofer 1 Offset
  kind: action
  command: "RQST:CS:OFFSETSUB1:{value}\r"
  params:
    - name: value
      type: string
      description: OFF or numeric level in -14.0 to 14.0.

- id: offsetsub1_query
  label: Query Subwoofer 1 Offset
  kind: query
  command: "RQST:CS:OFFSETSUB1:?\r"
  params: []

- id: offsetsub1_notification_enable
  label: Enable OFFSETSUB1 Notifications
  kind: action
  command: "RQST:CS:OFFSETSUB1:EN\r"
  params: []

- id: offsetsub1_notification_disable
  label: Disable OFFSETSUB1 Notifications
  kind: action
  command: "RQST:CS:OFFSETSUB1:DIS\r"
  params: []

- id: offsetsub1_notification_query
  label: Query OFFSETSUB1 Notification State
  kind: query
  command: "RQST:CS:OFFSETSUB1:NTF?\r"
  params: []

- id: offsetsub2_set
  label: Set Subwoofer 2 Offset
  kind: action
  command: "RQST:CS:OFFSETSUB2:{value}\r"
  params:
    - name: value
      type: string
      description: OFF or numeric level in -14.0 to 14.0.

- id: offsetsub2_query
  label: Query Subwoofer 2 Offset
  kind: query
  command: "RQST:CS:OFFSETSUB2:?\r"
  params: []

- id: offsetsub2_notification_enable
  label: Enable OFFSETSUB2 Notifications
  kind: action
  command: "RQST:CS:OFFSETSUB2:EN\r"
  params: []

- id: offsetsub2_notification_disable
  label: Disable OFFSETSUB2 Notifications
  kind: action
  command: "RQST:CS:OFFSETSUB2:DIS\r"
  params: []

- id: offsetsub2_notification_query
  label: Query OFFSETSUB2 Notification State
  kind: query
  command: "RQST:CS:OFFSETSUB2:NTF?\r"
  params: []

- id: osd_set
  label: Set On-Screen Display Messages
  kind: action
  command: "RQST:CS:OSD:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      description: Affects output monitor only, not front panel display.

- id: osd_query
  label: Query OSD State
  kind: query
  command: "RQST:CS:OSD:?\r"
  params: []

- id: osd_notification_enable
  label: Enable OSD Change Notifications
  kind: action
  command: "RQST:CS:OSD:EN\r"
  params: []

- id: osd_notification_disable
  label: Disable OSD Change Notifications
  kind: action
  command: "RQST:CS:OSD:DIS\r"
  params: []

- id: osd_notification_query
  label: Query OSD Notification State
  kind: query
  command: "RQST:CS:OSD:NTF?\r"
  params: []

- id: pwr_on
  label: Power On
  kind: action
  command: "RQST:CS:PWR:ON\r"
  params: []

- id: pwr_standby
  label: Enter Standby
  kind: action
  command: "RQST:CS:PWR:STANDBY\r"
  params: []

- id: pwr_query
  label: Query Power State
  kind: query
  command: "RQST:CS:PWR:?\r"
  params: []

- id: pwr_notification_enable
  label: Enable Power Change Notifications
  kind: action
  command: "RQST:CS:PWR:EN\r"
  params: []

- id: pwr_notification_disable
  label: Disable Power Change Notifications
  kind: action
  command: "RQST:CS:PWR:DIS\r"
  params: []

- id: pwr_notification_query
  label: Query Power Notification State
  kind: query
  command: "RQST:CS:PWR:NTF?\r"
  params: []

- id: recall_audioadj
  label: Recall Audio Adjustment Nominal Values
  kind: action
  command: "RQST:CS:RECALL:AUDIOADJ\r"
  params: []

- id: req_act_list
  label: Request List of Activities
  kind: query
  command: "RQST:CS:REQ_ACT_LIST:?\r"
  params: []

- id: req_aprof_list
  label: Request List of Audio Profiles
  kind: query
  command: "RQST:CS:REQ_APROF_LIST:?\r"
  params: []

- id: req_disp_list
  label: Request List of Display Configurations
  kind: query
  command: "RQST:CS:REQ_DISP_LIST:?\r"
  params: []

- id: req_spkr_list
  label: Request List of Speaker Configurations
  kind: query
  command: "RQST:CS:REQ_SPKR_LIST:?\r"
  params: []

- id: req_surr_list
  label: Request List of Available Surround Modes
  kind: query
  command: "RQST:CS:REQ_SURR_LIST:?\r"
  params: []

- id: req_vprof_list
  label: Request List of Video Profiles
  kind: query
  command: "RQST:CS:REQ_VPROF_LIST:?\r"
  params: []

- id: resolution_set
  label: Set Video Output Resolution
  kind: action
  command: "RQST:CS:RESOLUTION:{format}\r"
  params:
    - name: format
      type: enum
      values: [SD, ED, HD720P, HD1080I, HD1080P]

- id: resolution_query
  label: Query Video Output Resolution
  kind: query
  command: "RQST:CS:RESOLUTION:?\r"
  params: []

- id: resolution_notification_enable
  label: Enable Resolution Change Notifications
  kind: action
  command: "RQST:CS:RESOLUTION:EN\r"
  params: []

- id: resolution_notification_disable
  label: Disable Resolution Change Notifications
  kind: action
  command: "RQST:CS:RESOLUTION:DIS\r"
  params: []

- id: resolution_notification_query
  label: Query Resolution Notification State
  kind: query
  command: "RQST:CS:RESOLUTION:NTF?\r"
  params: []

- id: roomeqon_set
  label: Set Room EQ On/Off
  kind: action
  command: "RQST:CS:ROOMEQON:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: roomeqon_query
  label: Query Room EQ On/Off State
  kind: query
  command: "RQST:CS:ROOMEQON:?\r"
  params: []

- id: roomeqon_notification_enable
  label: Enable Room EQ On/Off Notifications
  kind: action
  command: "RQST:CS:ROOMEQON:EN\r"
  params: []

- id: roomeqon_notification_disable
  label: Disable Room EQ On/Off Notifications
  kind: action
  command: "RQST:CS:ROOMEQON:DIS\r"
  params: []

- id: roomeqon_notification_query
  label: Query Room EQ On/Off Notification State
  kind: query
  command: "RQST:CS:ROOMEQON:NTF?\r"
  params: []

- id: roomeq_set
  label: Select Room EQ Profile
  kind: action
  command: "RQST:CS:ROOMEQ:{number}\r"
  params:
    - name: number
      type: integer
      description: Room EQ setting 1 to 5.

- id: roomeq_query
  label: Query Room EQ Setting
  kind: query
  command: "RQST:CS:ROOMEQ:?\r"
  params: []

- id: roomeq_notification_enable
  label: Enable Room EQ Profile Notifications
  kind: action
  command: "RQST:CS:ROOMEQ:EN\r"
  params: []

- id: roomeq_notification_disable
  label: Disable Room EQ Profile Notifications
  kind: action
  command: "RQST:CS:ROOMEQ:DIS\r"
  params: []

- id: roomeq_notification_query
  label: Query Room EQ Profile Notification State
  kind: query
  command: "RQST:CS:ROOMEQ:NTF?\r"
  params: []

- id: spkrcfg_select
  label: Select Speaker Configuration
  kind: action
  command: "RQST:CS:SPKRCFG:\"{name}\"\r"
  params:
    - name: name
      type: string
      description: Case sensitive name of the speaker configuration in the system database.

- id: spkrcfg_query
  label: Query Current Speaker Configuration
  kind: query
  command: "RQST:CS:SPKRCFG:?\r"
  params: []

- id: spkrcfg_notification_enable
  label: Enable Speaker Configuration Notifications
  kind: action
  command: "RQST:CS:SPKRCFG:EN\r"
  params: []

- id: spkrcfg_notification_disable
  label: Disable Speaker Configuration Notifications
  kind: action
  command: "RQST:CS:SPKRCFG:DIS\r"
  params: []

- id: spkrcfg_notification_query
  label: Query Speaker Configuration Notification State
  kind: query
  command: "RQST:CS:SPKRCFG:NTF?\r"
  params: []

- id: status_main_query
  label: Query Main Zone Status
  kind: query
  command: "RQST:CS:STATUS_MAIN:?\r"
  notes: Response is a comma-separated list of values in fixed order (Video Input Resolution, Output Frame Rate, Color Space, HDCP Status, Audio In, Signal, Sample Rate, Input Channels, Bit Rate, EX Encoded, 2.0 Encoding, ES Encoding, Dialog Offset, Mix Room, Center Mix Level, Surround Mix Level, Word Length). Parameter NAMES are NOT included in response.

- id: status_main_notification_enable
  label: Enable Main Zone Status Notifications
  kind: action
  command: "RQST:CS:STATUS_MAIN:EN\r"
  params: []

- id: status_main_notification_disable
  label: Disable Main Zone Status Notifications
  kind: action
  command: "RQST:CS:STATUS_MAIN:DIS\r"
  params: []

- id: status_main_notification_query
  label: Query Main Zone Status Notification State
  kind: query
  command: "RQST:CS:STATUS_MAIN:NTF?\r"
  params: []

- id: status_system_query
  label: Query System Status
  kind: query
  command: "RQST:CS:STATUS_SYSTEM:?\r"
  notes: Response: MODEL (e.g. "ML No 502"), SW VERSION (max 20 char string), TIMESINCE POWERUP (xx:xx:xx hrs:mins:sec). Notification not available.

- id: status_zone2_query
  label: Query Zone 2 Status
  kind: query
  command: "RQST:CS:STATUS_ZONE2:?\r"
  notes: Response: SIGNAL (one of Dolby Digital, Dolby Digital EX, DTS, DTS ES Matrix, DTS ES Discrete, DTS 96/24, AAC, PCM, Analog, Unknown).

- id: status_zone2_notification_enable
  label: Enable Zone 2 Status Notifications
  kind: action
  command: "RQST:CS:STATUS_ZONE2:EN\r"
  params: []

- id: status_zone2_notification_disable
  label: Disable Zone 2 Status Notifications
  kind: action
  command: "RQST:CS:STATUS_ZONE2:DIS\r"
  params: []

- id: status_zone2_notification_query
  label: Query Zone 2 Status Notification State
  kind: query
  command: "RQST:CS:STATUS_ZONE2:NTF?\r"
  params: []

- id: surrmode_set
  label: Select Surround Mode
  kind: action
  command: "RQST:CS:SURRMODE:{mode}\r"
  params:
    - name: mode
      type: enum
      values: [L7Film, L7TV, L7Music, L7MusicSurr, PLIIxMovie, PLIIxMusic, PLIIMovie, PLIIMusic, ProLogic, dtsNEO6Cinema, dtsNEO6Music, MultiChan, StereoSurr, Downmix, Stereo, MonoLogic, MonoSurr, Mono]
      description: Availability depends on system configuration and decoded audio stream. INVALID_MODE returned if not currently available.

- id: surrmode_query
  label: Query Current Surround Mode
  kind: query
  command: "RQST:CS:SURRMODE:?\r"
  params: []

- id: surrmode_notification_enable
  label: Enable Surround Mode Change Notifications
  kind: action
  command: "RQST:CS:SURRMODE:EN\r"
  params: []

- id: surrmode_notification_disable
  label: Disable Surround Mode Change Notifications
  kind: action
  command: "RQST:CS:SURRMODE:DIS\r"
  params: []

- id: surrmode_notification_query
  label: Query Surround Mode Notification State
  kind: query
  command: "RQST:CS:SURRMODE:NTF?\r"
  params: []

- id: trigger_1_set
  label: Set Trigger 1
  kind: action
  command: "RQST:CS:TRIGGER_1:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      notes: Trigger state set via this command is not reflected in the UI.

- id: trigger_1_query
  label: Query Trigger 1
  kind: query
  command: "RQST:CS:TRIGGER_1:?\r"
  params: []

- id: trigger_2_set
  label: Set Trigger 2
  kind: action
  command: "RQST:CS:TRIGGER_2:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      notes: Trigger state set via this command is not reflected in the UI.

- id: trigger_2_query
  label: Query Trigger 2
  kind: query
  command: "RQST:CS:TRIGGER_2:?\r"
  params: []

- id: trigger_3_set
  label: Set Trigger 3
  kind: action
  command: "RQST:CS:TRIGGER_3:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      notes: Trigger state set via this command is not reflected in the UI.

- id: trigger_3_query
  label: Query Trigger 3
  kind: query
  command: "RQST:CS:TRIGGER_3:?\r"
  params: []

- id: trigger_4_set
  label: Set Trigger 4
  kind: action
  command: "RQST:CS:TRIGGER_4:{state}\r"
  params:
    - name: state
      type: enum
      values: [ON, OFF]
      notes: Trigger state set via this command is not reflected in the UI.

- id: trigger_4_query
  label: Query Trigger 4
  kind: query
  command: "RQST:CS:TRIGGER_4:?\r"
  params: []

- id: vol_set
  label: Set Main Zone Volume
  kind: action
  command: "RQST:CS:VOL:{value}\r"
  params:
    - name: value
      type: number
      description: Volume 0.0 to 100.0. Setting via this command does NOT pop-up the volume status window in the UI.

- id: vol_query
  label: Query Main Zone Volume
  kind: query
  command: "RQST:CS:VOL:?\r"
  params: []

- id: vol_notification_enable
  label: Enable Volume Change Notifications
  kind: action
  command: "RQST:CS:VOL:EN\r"
  params: []

- id: vol_notification_disable
  label: Disable Volume Change Notifications
  kind: action
  command: "RQST:CS:VOL:DIS\r"
  params: []

- id: vol_notification_query
  label: Query Volume Notification State
  kind: query
  command: "RQST:CS:VOL:NTF?\r"
  params: []

- id: vprof_select
  label: Select Video Profile
  kind: action
  command: "RQST:CS:VPROF:\"{name}\"\r"
  params:
    - name: name
      type: string
      description: Case sensitive name of the video profile in the system database.

- id: vprof_query
  label: Query Current Video Profile
  kind: query
  command: "RQST:CS:VPROF:?\r"
  params: []

- id: vprof_notification_enable
  label: Enable Video Profile Change Notifications
  kind: action
  command: "RQST:CS:VPROF:EN\r"
  params: []

- id: vprof_notification_disable
  label: Disable Video Profile Change Notifications
  kind: action
  command: "RQST:CS:VPROF:DIS\r"
  params: []

- id: vprof_notification_query
  label: Query Video Profile Notification State
  kind: query
  command: "RQST:CS:VPROF:NTF?\r"
  params: []

- id: wait_test
  label: Wait/Error Mechanism Test
  kind: action
  command: "RQST:CS:WAIT_TEST:?\r"
  notes: Test only. Response: 3x WAIT followed by ERROR.

- id: xover_frnt_set
  label: Set Front Speaker Crossover
  kind: action
  command: "RQST:CS:XOVER_FRNT:{value}\r"
  params:
    - name: value
      type: string
      description: FULLSUB, FULL, or a frequency in 30-120 Hz (must be in 10 Hz increments or command returns INVALID_PRM).

- id: xover_frnt_query
  label: Query Front Speaker Crossover
  kind: query
  command: "RQST:CS:XOVER_FRNT:?\r"
  params: []

- id: xover_frnt_notification_enable
  label: Enable Front XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_FRNT:EN\r"
  params: []

- id: xover_frnt_notification_disable
  label: Disable Front XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_FRNT:DIS\r"
  params: []

- id: xover_frnt_notification_query
  label: Query Front XOver Notification State
  kind: query
  command: "RQST:CS:XOVER_FRNT:NTF?\r"
  params: []

- id: xover_center_set
  label: Set Center Speaker Crossover
  kind: action
  command: "RQST:CS:XOVER_CENTER:{value}\r"
  params:
    - name: value
      type: string
      description: FULLSUB, FULL, or 30-120 Hz in 10 Hz increments.

- id: xover_center_query
  label: Query Center Speaker Crossover
  kind: query
  command: "RQST:CS:XOVER_CENTER:?\r"
  params: []

- id: xover_center_notification_enable
  label: Enable Center XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_CENTER:EN\r"
  params: []

- id: xover_center_notification_disable
  label: Disable Center XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_CENTER:DIS\r"
  params: []

- id: xover_center_notification_query
  label: Query Center XOver Notification State
  kind: query
  command: "RQST:CS:XOVER_CENTER:NTF?\r"
  params: []

- id: xover_surr_set
  label: Set Surround Speaker Crossover
  kind: action
  command: "RQST:CS:XOVER_SURR:{value}\r"
  params:
    - name: value
      type: string
      description: FULLSUB, FULL, or 30-120 Hz in 10 Hz increments.

- id: xover_surr_query
  label: Query Surround Speaker Crossover
  kind: query
  command: "RQST:CS:XOVER_SURR:?\r"
  params: []

- id: xover_surr_notification_enable
  label: Enable Surround XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_SURR:EN\r"
  params: []

- id: xover_surr_notification_disable
  label: Disable Surround XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_SURR:DIS\r"
  params: []

- id: xover_surr_notification_query
  label: Query Surround XOver Notification State
  kind: query
  command: "RQST:CS:XOVER_SURR:NTF?\r"
  params: []

- id: xover_rear_set
  label: Set Rear Speaker Crossover
  kind: action
  command: "RQST:CS:XOVER_REAR:{value}\r"
  params:
    - name: value
      type: string
      description: FULLSUB, FULL, or 30-120 Hz in 10 Hz increments.

- id: xover_rear_query
  label: Query Rear Speaker Crossover
  kind: query
  command: "RQST:CS:XOVER_REAR:?\r"
  params: []

- id: xover_rear_notification_enable
  label: Enable Rear XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_REAR:EN\r"
  params: []

- id: xover_rear_notification_disable
  label: Disable Rear XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_REAR:DIS\r"
  params: []

- id: xover_rear_notification_query
  label: Query Rear XOver Notification State
  kind: query
  command: "RQST:CS:XOVER_REAR:NTF?\r"
  params: []

- id: xover_sub_set
  label: Set Subwoofer Crossover (LPF)
  kind: action
  command: "RQST:CS:XOVER_SUB:{value}\r"
  params:
    - name: value
      type: enum
      values: [FULL, COMP]
      description: Maps to the Subwoofer LPF parameter in the User Interface.

- id: xover_sub_query
  label: Query Subwoofer Crossover
  kind: query
  command: "RQST:CS:XOVER_SUB:?\r"
  params: []

- id: xover_sub_notification_enable
  label: Enable Subwoofer XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_SUB:EN\r"
  params: []

- id: xover_sub_notification_disable
  label: Disable Subwoofer XOver Notifications
  kind: action
  command: "RQST:CS:XOVER_SUB:DIS\r"
  params: []

- id: xover_sub_notification_query
  label: Query Subwoofer XOver Notification State
  kind: query
  command: "RQST:CS:XOVER_SUB:NTF?\r"
  params: []

- id: z2act_select
  label: Select Zone 2 Activity
  kind: action
  command: "RQST:CS:Z2ACT:\"{name}\"\r"
  params:
    - name: name
      type: string
      description: Case sensitive name of the Zone 2 activity.

- id: z2act_set_off
  label: Set Zone 2 Audio Off
  kind: action
  command: "RQST:CS:Z2ACT:OFF\r"
  params: []

- id: z2act_query
  label: Query Current Zone 2 Activity
  kind: query
  command: "RQST:CS:Z2ACT:?\r"
  params: []

- id: z2act_notification_enable
  label: Enable Zone 2 Activity Change Notifications
  kind: action
  command: "RQST:CS:Z2ACT:EN\r"
  params: []

- id: z2act_notification_disable
  label: Disable Zone 2 Activity Change Notifications
  kind: action
  command: "RQST:CS:Z2ACT:DIS\r"
  params: []

- id: z2act_notification_query
  label: Query Zone 2 Activity Notification State
  kind: query
  command: "RQST:CS:Z2ACT:NTF?\r"
  params: []

- id: z2vol_set
  label: Set Zone 2 Volume
  kind: action
  command: "RQST:CS:Z2VOL:{value}\r"
  params:
    - name: value
      type: number
      description: Volume 0.0 to 100.0.

- id: z2vol_query
  label: Query Zone 2 Volume
  kind: query
  command: "RQST:CS:Z2VOL:?\r"
  params: []

- id: z2vol_notification_enable
  label: Enable Zone 2 Volume Change Notifications
  kind: action
  command: "RQST:CS:Z2VOL:EN\r"
  params: []

- id: z2vol_notification_disable
  label: Disable Zone 2 Volume Change Notifications
  kind: action
  command: "RQST:CS:Z2VOL:DIS\r"
  params: []

- id: z2vol_notification_query
  label: Query Zone 2 Volume Notification State
  kind: query
  command: "RQST:CS:Z2VOL:NTF?\r"
  params: []

- id: zoom_set
  label: Set Zoom Mode
  kind: action
  command: "RQST:CS:ZOOM:{mode}\r"
  params:
    - name: mode
      type: enum
      values: [NORM, WIDE, FILL, FW]

- id: zoom_query
  label: Query Zoom Mode
  kind: query
  command: "RQST:CS:ZOOM:?\r"
  params: []

- id: zoom_notification_enable
  label: Enable Zoom Change Notifications
  kind: action
  command: "RQST:CS:ZOOM:EN\r"
  params: []

- id: zoom_notification_disable
  label: Disable Zoom Change Notifications
  kind: action
  command: "RQST:CS:ZOOM:DIS\r"
  params: []

- id: zoom_notification_query
  label: Query Zoom Notification State
  kind: query
  command: "RQST:CS:ZOOM:NTF?\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]

- id: pwr_notification_state
  type: enum
  values: [EN, DIS]

- id: vol_level
  type: number
  description: 0.0 to 100.0

- id: mute_state
  type: enum
  values: [ON, OFF]

- id: act_name
  type: string

- id: aprof_name
  type: string

- id: dispcfg_name
  type: string

- id: spkrcfg_name
  type: string

- id: vprof_name
  type: string

- id: bal_value
  type: string
  description: ROFF, LOFF, or numeric -14.0 to 14.0

- id: fader_value
  type: string
  description: FOFF, BOFF, or numeric -14.0 to 14.0

- id: avsync_value
  type: number
  description: 0.0 to 500.0 milliseconds

- id: resolution_mode
  type: enum
  values: [SD, ED, HD720P, HD1080I, HD1080P]

- id: surrmode
  type: enum
  values: [L7Film, L7TV, L7Music, L7MusicSurr, PLIIxMovie, PLIIxMusic, PLIIMovie, PLIIMusic, ProLogic, dtsNEO6Cinema, dtsNEO6Music, MultiChan, StereoSurr, Downmix, Stereo, MonoLogic, MonoSurr, Mono]

- id: zoom_mode
  type: enum
  values: [NORM, WIDE, FILL, FW]

- id: roomeq_setting
  type: string
  description: OFF or 1-5

- id: roomeqon_state
  type: enum
  values: [ON, OFF]

- id: encenter_state
  type: enum
  values: [ON, OFF]

- id: ensurr_state
  type: enum
  values: [ON, OFF]

- id: enrear_state
  type: enum
  values: [ON, OFF]

- id: ensub1_state
  type: enum
  values: [ON, OFF]

- id: ensub2_state
  type: enum
  values: [ON, OFF]

- id: cal_dist_lf
  type: number
  description: Feet, 0.0 to 40.0

- id: cal_dist_rf
  type: number

- id: cal_dist_c
  type: number

- id: cal_dist_ls
  type: number

- id: cal_dist_rs
  type: number

- id: cal_dist_lb
  type: number

- id: cal_dist_rb
  type: number

- id: cal_dist_lsub1
  type: number

- id: cal_dist_rsub1
  type: number

- id: cal_dist_lsub2
  type: number

- id: cal_dist_rsub2
  type: number

- id: cal_lvl_lf
  type: number
  description: dB, -14.0 to 14.0

- id: cal_lvl_rf
  type: number

- id: cal_lvl_c
  type: number

- id: cal_lvl_ls
  type: number

- id: cal_lvl_rs
  type: number

- id: cal_lvl_lb
  type: number

- id: cal_lvl_rb
  type: number

- id: cal_lvl_lsub1
  type: number

- id: cal_lvl_rsub1
  type: number

- id: cal_lvl_lsub2
  type: number

- id: cal_lvl_rsub2
  type: number

- id: offsetf_value
  type: string
  description: OFF or -14.0 to 14.0

- id: offsetc_value
  type: string

- id: offsets_value
  type: string

- id: offsetr_value
  type: string

- id: offsetsub1_value
  type: string

- id: offsetsub2_value
  type: string

- id: xover_frnt_value
  type: string
  description: FULLSUB, FULL, or 30-120 Hz

- id: xover_center_value
  type: string

- id: xover_surr_value
  type: string

- id: xover_rear_value
  type: string

- id: xover_sub_value
  type: enum
  values: [FULL, COMP]

- id: trigger_1_state
  type: enum
  values: [ON, OFF]

- id: trigger_2_state
  type: enum
  values: [ON, OFF]

- id: trigger_3_state
  type: enum
  values: [ON, OFF]

- id: trigger_4_state
  type: enum
  values: [ON, OFF]

- id: menubk_state
  type: enum
  values: [ON, OFF]

- id: monen_state
  type: enum
  values: [ON, OFF]

- id: osd_state
  type: enum
  values: [ON, OFF]

- id: z2act_name
  type: string
  description: Activity name, or OFF

- id: z2vol_level
  type: number
  description: 0.0 to 100.0

- id: status_main
  type: object
  description: Comma-separated list in fixed order: VIDEO INPUT RESOLUTION, OUTPUT FRAME RATE, COLOR SPACE, HDCP STATUS, AUDIO IN, SIGNAL, SAMPLE RATE, INPUT CHANNELS, BIT RATE, EX ENCODED, 2.0 ENCODING, ES ENCODING, DIALOG OFFSET, MIX ROOM, CENTER MIX LEVEL, SURROUND MIX LEVEL, WORD LENGTH. Parameter NAMES are NOT included.

- id: status_system
  type: object
  description: Comma-separated: MODEL, SW VERSION, TIMESINCE POWERUP (hrs:mins:sec)

- id: status_zone2
  type: object
  description: SIGNAL only (one of Dolby Digital, Dolby Digital EX, DTS, DTS ES Matrix, DTS ES Discrete, DTS 96/24, AAC, PCM, Analog, Unknown)

- id: req_act_list
  type: string
  description: Comma-separated list of activity names

- id: req_aprof_list
  type: string
  description: Comma-separated list of audio profile names

- id: req_disp_list
  type: string

- id: req_spkr_list
  type: string

- id: req_surr_list
  type: string

- id: req_vprof_list
  type: string

- id: rsp_invalid_src
  type: string
  description: RSP:INVALID_SRC\r

- id: rsp_invalid_cmd
  type: string
  description: RSP:CS:INVALID_CMD\r

- id: rsp_invalid_prm
  type: string
  description: RSP:CS:{CMD}:INVALID_PRM\r

- id: rsp_invalid_str
  type: string
  description: RSP:CS:INVALID_STR\r

- id: rsp_invalid_name
  type: string
  description: RSP:CS:{CMD}:INVALID_NAME\r

- id: rsp_invalid_mode
  type: string
  description: RSP:CS:SURRMODE:INVALID_MODE\r

- id: rsp_nack
  type: string
  description: RSP:CS:{CMD}:NACK\r - system in Standby

- id: rsp_wait
  type: string
  description: RSP:CS:{CMD}:WAIT\r - up to 3 WAIT responses

- id: rsp_error
  type: string
  description: RSP:CS:{CMD}:ERROR\r
```

## Variables
```yaml
# UNRESOLVED: source describes settable numeric/string parameters inline (e.g. VOL 0.0-100.0,
# CAL_DIST_* 0.0-40.0). These are exposed as Actions above; no separate persistent variables
# beyond the named configurations (Activity, AudioProfile, DisplayConfig, SpeakerConfig,
# VideoProfile) which are user-named and not enumerated in the source.
```

## Events
```yaml
- id: ntf_pwr
  description: Power state change notification
  example: "NTF:UI:PWR:ON\r"

- id: ntf_vol
  description: Volume change notification
  example: "NTF:UI:VOL:25.6\r"

- id: ntf_act
  description: Activity change notification
  example: "NTF:UI:ACT:{name}\r"

- id: ntf_fault_therm
  description: Internal fan failed and system overheated
  example: "NTF:AV:FAULT:THERM\r"

- id: ntf_fault_pwr
  description: Power fail condition
  example: "NTF:AV:FAULT:PWR\r"

- id: ntf_fault_signal
  description: General signal fault with ML Net or Link2 attached devices
  example: "NTF:AV:FAULT:SIGNAL\r"

- id: ntf_fault_unknown
  description: System software fault - see front panel for details
  example: "NTF:AV:FAULT:UNKNOWN\r"

# Source field for unsolicited notifications: UI (user interaction) or AV (component-generated fault).
# Notifications are only sent to the controller if enabled; per-command enable/disable via
# {CMD}:EN / {CMD}:DIS. Bulk controls via NTF:DIS_ALL_TEMP / DIS_ALL_PERSIST / DIS_ALL_PERM.
```

## Macros
```yaml
# UNRESOLVED: source describes the FPDWNUP/IRDWNUP composite commands and the FPRPT/IRRPT
# repeat-rate behavior (5 initial then 3 subsequent inside Setup), but does not specify
# any device-defined multi-step macro sequences the host can invoke.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. The CRITICAL FAULT notifications (THERM, PWR, SIGNAL,
# UNKNOWN) are reactive notifications, not preventive interlocks.
```

## Notes
Message framing applies to BOTH transports verbatim: `HDR:SRC:CMD:PARAM\r`, fields case sensitive, colon separated, 0x0D terminator, max 1024 chars, host must wait for ACK within 500ms. RS-232 default is OFF (Ethernet is default control port); activate via Setup → User Options → Control Options → External Control.

Many commands have non-persistent side effects: PWR, MUTE, SURRMODE, TRIGGER_*, DISPCFG, APROF, SPKRCFG, FPDWNUP/IRDWNUP and several others are NOT saved across standby. See source "Retention of External Command Changes" table for the full list of persistent vs. session-only commands. VOL and Z2VOL are saved ONLY if Setup → User Options → Audio Options → Power On Volume = "Last Level".

The FAULT command has no incoming request form — it appears only as an outgoing AV-source notification. NTF:DIS_ALL_PERM irreversibly erases the External Protocol Notification database (only NTF:RESTORE_DEFAULT can recover it).

Per-encoder behavior: FPRPT and IRRPT are buffered for smooth UI operation; number of repeats required varies (e.g. 5 then 3 inside Setup). FPDWNUP/IRDWNUP execute the corresponding DWN then UP commands atomically; notifications are not generated for these composite commands.

Sub-mnemonics that share one opcode (e.g. SURRMODE's 18 modes, RESOLUTION's 5 formats, ZOOM's 4 modes, BAL's ROFF/LOFF/numeric, OFFSET*'s OFF/numeric) are emitted as single Actions with enum-typed params per the granularity rule (one command = one opcode).

<!-- UNRESOLVED: factory default activity names, audio profile names, video profile names, display configuration names, and speaker configuration names are not enumerated in the source; they are user-editable pre-configured values. Firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - marklevinson.com
source_urls:
  - https://www.marklevinson.com/on/demandware.static/-/Sites-ML-US-NCOM-Library/default/dw3b18792f/glp/support/downloads/No502/Mark-Levinson-No502-Serial-Protocol.pdf
retrieved_at: 2026-04-30T04:26:55.366Z
last_checked_at: 2026-06-02T05:46:07.837Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:07.837Z
matched_actions: 292
action_count: 292
confidence: medium
summary: "All 292 spec action units matched verbatim to the 88 source commands (88 opcodes × set/query/notification variants); transport values port 15003, baud 57600, 8N1 all confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, factory default activity/audio profile/video profile/display configuration/speaker configuration names not enumerated in source"
- "source describes settable numeric/string parameters inline (e.g. VOL 0.0-100.0,"
- "source describes the FPDWNUP/IRDWNUP composite commands and the FPRPT/IRRPT"
- "source contains no explicit safety warnings, interlock procedures, or"
- "factory default activity names, audio profile names, video profile names, display configuration names, and speaker configuration names are not enumerated in the source; they are user-editable pre-configured values. Firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
