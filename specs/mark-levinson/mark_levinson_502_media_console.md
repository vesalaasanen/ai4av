---
spec_id: admin/mark-levinson-no502-media-console
schema_version: ai4av-public-spec-v1
revision: 1
title: "Mark Levinson No502 Media Console Control Spec"
manufacturer: "Mark Levinson"
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
source_domains:
  - marklevinson.com
source_urls:
  - https://www.marklevinson.com/on/demandware.static/-/Sites-ML-US-NCOM-Library/default/dw3b18792f/glp/support/downloads/No502/Mark-Levinson-No502-Serial-Protocol.pdf
retrieved_at: 2026-05-02T20:26:18.740Z
last_checked_at: 2026-05-14T18:17:18.075Z
generated_at: 2026-05-14T18:17:18.075Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - FAULT
  - WAIT_TEST
  - "no multi-step sequences described in source"
  - "no explicit safety interlock procedures for power sequencing documented in source"
  - "firmware version compatibility range not stated"
  - "DHCP configuration details beyond \"default behavior\" not fully specified"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.075Z
  matched_actions: 63
  action_count: 63
  confidence: medium
  summary: "All 105 spec actions matched source commands; FAULT and WAIT_TEST correctly omitted as non-controllable; all transport parameters verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-02
---

# Mark Levinson No502 Media Console Control Spec

## Summary
Mark Levinson No502 Media Console — high-end A/V processor controllable via RS-232 (RJ-11) or TCP/IP (RJ-45). ASCII colon-delimited protocol with HDR:SRC:CMD:PARAM format, terminated by `\r`. 88 external protocol commands covering power, volume, activity routing, surround modes, speaker calibration, crossover, triggers, Zone 2, and system status.

## Transport
```yaml
protocols:
  - tcp
  - serial
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

## Traits
```yaml
traits:
  - powerable     # PWR ON/STANDBY
  - levelable     # VOL, BAL, FADER, AVSYNC, offsets, calibration levels
  - queryable     # most commands support ? query
  - routable      # ACT, Z2ACT select activities/sources
```

## Actions
```yaml
actions:
  - id: pwr_on
    label: Power On
    kind: action
    command: "RQST:CS:PWR:ON\\r"
    params: []

  - id: pwr_standby
    label: Power Standby
    kind: action
    command: "RQST:CS:PWR:STANDBY\\r"
    params: []

  - id: vol_set
    label: Set Volume
    kind: action
    command: "RQST:CS:VOL:{value}\\r"
    params:
      - name: value
        type: float
        min: 0.0
        max: 100.0
        description: Volume level

  - id: mute_on
    label: Mute On
    kind: action
    command: "RQST:CS:MUTE:ON\\r"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "RQST:CS:MUTE:OFF\\r"
    params: []

  - id: act_set
    label: Select Activity
    kind: action
    command: "RQST:CS:ACT:{name}\\r"
    params:
      - name: name
        type: string
        description: Case-sensitive activity name

  - id: aprof_set
    label: Select Audio Profile
    kind: action
    command: "RQST:CS:APROF:{name}\\r"
    params:
      - name: name
        type: string
        description: Case-sensitive audio profile name

  - id: vprof_set
    label: Select Video Profile
    kind: action
    command: "RQST:CS:VPROF:{name}\\r"
    params:
      - name: name
        type: string
        description: Case-sensitive video profile name

  - id: dispcfg_set
    label: Select Display Configuration
    kind: action
    command: "RQST:CS:DISPCFG:{name}\\r"
    params:
      - name: name
        type: string
        description: Case-sensitive display configuration name

  - id: spkrcfg_set
    label: Select Speaker Configuration
    kind: action
    command: "RQST:CS:SPKRCFG:{name}\\r"
    params:
      - name: name
        type: string
        description: Case-sensitive speaker configuration name

  - id: surrmode_set
    label: Select Surround Mode
    kind: action
    command: "RQST:CS:SURRMODE:{mode}\\r"
    params:
      - name: mode
        type: enum
        values: [L7Film, L7TV, L7Music, L7MusicSurr, PLIIxMovie, PLIIxMusic, PLIIMovie, PLIIMusic, ProLogic, dtsNEO6Cinema, dtsNEO6Music, MultiChan, StereoSurr, Downmix, Stereo, MonoLogic, MonoSurr, Mono]
        description: Surround mode; availability depends on system config and decoded stream

  - id: bal_set
    label: Set Balance
    kind: action
    command: "RQST:CS:BAL:{value}\\r"
    params:
      - name: value
        type: string
        description: "-14.0 to 14.0, ROFF, or LOFF"

  - id: fader_set
    label: Set Fader
    kind: action
    command: "RQST:CS:FADER:{value}\\r"
    params:
      - name: value
        type: string
        description: "-14.0 to 14.0, FOFF, or BOFF"

  - id: avsync_set
    label: Set AV Sync Delay
    kind: action
    command: "RQST:CS:AVSYNC:{value}\\r"
    params:
      - name: value
        type: float
        min: 0.0
        max: 500.0
        description: AV sync delay

  - id: resolution_set
    label: Set Resolution
    kind: action
    command: "RQST:CS:RESOLUTION:{mode}\\r"
    params:
      - name: mode
        type: enum
        values: [SD, ED, HD720P, HD1080I, HD1080P]

  - id: zoom_set
    label: Set Zoom
    kind: action
    command: "RQST:CS:ZOOM:{mode}\\r"
    params:
      - name: mode
        type: enum
        values: [NORM, WIDE, FILL, FW]

  - id: osd_on
    label: OSD On
    kind: action
    command: "RQST:CS:OSD:ON\\r"
    params: []

  - id: osd_off
    label: OSD Off
    kind: action
    command: "RQST:CS:OSD:OFF\\r"
    params: []

  - id: monen_on
    label: Monitor Output On
    kind: action
    command: "RQST:CS:MONEN:ON\\r"
    params: []

  - id: monen_off
    label: Monitor Output Off
    kind: action
    command: "RQST:CS:MONEN:OFF\\r"
    params: []

  - id: menubk_on
    label: Menu Backlight On
    kind: action
    command: "RQST:CS:MENUBK:ON\\r"
    params: []

  - id: menubk_off
    label: Menu Backlight Off
    kind: action
    command: "RQST:CS:MENUBK:OFF\\r"
    params: []

  - id: fpdispintens_set
    label: Set Front Panel Display Intensity
    kind: action
    command: "RQST:CS:FPDISPINTENS:{level}\\r"
    params:
      - name: level
        type: enum
        values: [OFF, LOW, MED, HIGH]

  - id: roomeqon_on
    label: Room EQ On
    kind: action
    command: "RQST:CS:ROOMEQON:ON\\r"
    params: []

  - id: roomeqon_off
    label: Room EQ Off
    kind: action
    command: "RQST:CS:ROOMEQON:OFF\\r"
    params: []

  - id: roomeq_set
    label: Set Room EQ Config
    kind: action
    command: "RQST:CS:ROOMEQ:{value}\\r"
    params:
      - name: value
        type: integer
        min: 1
        max: 5

  - id: encenter_on
    label: Enable Center Speaker
    kind: action
    command: "RQST:CS:ENCENTER:ON\\r"
    params: []

  - id: encenter_off
    label: Disable Center Speaker
    kind: action
    command: "RQST:CS:ENCENTER:OFF\\r"
    params: []

  - id: ensurr_on
    label: Enable Surround Speakers
    kind: action
    command: "RQST:CS:ENSURR:ON\\r"
    params: []

  - id: ensurr_off
    label: Disable Surround Speakers
    kind: action
    command: "RQST:CS:ENSURR:OFF\\r"
    params: []

  - id: enrear_on
    label: Enable Rear Speakers
    kind: action
    command: "RQST:CS:ENREAR:ON\\r"
    params: []

  - id: enrear_off
    label: Disable Rear Speakers
    kind: action
    command: "RQST:CS:ENREAR:OFF\\r"
    params: []

  - id: ensub1_on
    label: Enable Subwoofer 1
    kind: action
    command: "RQST:CS:ENSUB1:ON\\r"
    params: []

  - id: ensub1_off
    label: Disable Subwoofer 1
    kind: action
    command: "RQST:CS:ENSUB1:OFF\\r"
    params: []

  - id: ensub2_on
    label: Enable Subwoofer 2
    kind: action
    command: "RQST:CS:ENSUB2:ON\\r"
    params: []

  - id: ensub2_off
    label: Disable Subwoofer 2
    kind: action
    command: "RQST:CS:ENSUB2:OFF\\r"
    params: []

  - id: trigger_set
    label: Set Trigger
    kind: action
    command: "RQST:CS:TRIGGER_{n}:{state}\\r"
    params:
      - name: n
        type: integer
        min: 1
        max: 4
        description: Trigger number
      - name: state
        type: enum
        values: [ON, OFF]

  - id: z2act_set
    label: Set Zone 2 Activity
    kind: action
    command: "RQST:CS:Z2ACT:{name}\\r"
    params:
      - name: name
        type: string
        description: Case-sensitive activity name or OFF

  - id: z2vol_set
    label: Set Zone 2 Volume
    kind: action
    command: "RQST:CS:Z2VOL:{value}\\r"
    params:
      - name: value
        type: float
        min: 0.0
        max: 100.0

  - id: offset_set
    label: Set Speaker Offset
    kind: action
    command: "RQST:CS:{channel}:{value}\\r"
    params:
      - name: channel
        type: enum
        values: [OFFSETF, OFFSETC, OFFSETS, OFFSETR, OFFSETSUB1, OFFSETSUB2]
      - name: value
        type: string
        description: "-14.0 to 14.0 or OFF"

  - id: cal_dist_set
    label: Set Calibration Distance
    kind: action
    command: "RQST:CS:CAL_DIST_{channel}:{value}\\r"
    params:
      - name: channel
        type: enum
        values: [LF, RF, C, LS, RS, LB, RB, LSUB1, RSUB1, LSUB2, RSUB2]
      - name: value
        type: float
        min: 0.0
        max: 40.0
        description: Distance in feet (always reported in feet regardless of system setting)

  - id: cal_lvl_set
    label: Set Calibration Level
    kind: action
    command: "RQST:CS:CAL_LVL_{channel}:{value}\\r"
    params:
      - name: channel
        type: enum
        values: [LF, RF, C, LS, RS, LB, RB, LSUB1, RSUB1, LSUB2, RSUB2]
      - name: value
        type: float
        min: -14.0
        max: 14.0

  - id: xover_set
    label: Set Crossover Frequency
    kind: action
    command: "RQST:CS:XOVER_{channel}:{value}\\r"
    params:
      - name: channel
        type: enum
        values: [FRNT, CENTER, SURR, REAR]
      - name: value
        type: string
        description: "FULLSUB, FULL, or 30-120 in 10Hz increments"

  - id: xover_sub_set
    label: Set Subwoofer Crossover
    kind: action
    command: "RQST:CS:XOVER_SUB:{value}\\r"
    params:
      - name: value
        type: enum
        values: [FULL, COMP]

  - id: recall_audioadj
    label: Recall Audio Adjustments
    kind: action
    command: "RQST:CS:RECALL:AUDIOADJ\\r"
    params: []

  - id: nop
    label: No Operation
    kind: action
    command: "RQST:CS:NOP:NOP\\r"
    params: []
    description: Communication test; responds with ACK

  - id: ntf_dis_all_temp
    label: Disable All Notifications Temporarily
    kind: action
    command: "RQST:CS:NTF:DIS_ALL_TEMP\\r"
    params: []
    description: Disables all notifications until power state change

  - id: ntf_dis_all_persist
    label: Disable All Notifications Persistently
    kind: action
    command: "RQST:CS:NTF:DIS_ALL_PERSIST\\r"
    params: []
    description: Disables all notifications across power cycles until restore

  - id: ntf_dis_all_perm
    label: Disable All Notifications Permanently
    kind: action
    command: "RQST:CS:NTF:DIS_ALL_PERM\\r"
    params: []
    description: Irrevocably erases notification database; sets all to DIS

  - id: ntf_restore_default
    label: Restore Notification Defaults
    kind: action
    command: "RQST:CS:NTF:RESTORE_DEFAULT\\r"
    params: []

  - id: ntf_restore_lastsaved
    label: Restore Last Saved Notifications
    kind: action
    command: "RQST:CS:NTF:RESTORE_LAST_SAVED\\r"
    params: []

  - id: fpdwnup
    label: Front Panel Button Press-Release
    kind: action
    command: "RQST:CS:FPDWNUP:{key}\\r"
    params:
      - name: key
        type: enum
        values: [ZONE, PREVIEW, DISPLAY, SETUP, MENU, MUTE, VIDEO_PROFILE, AUDIO_PROFILE, SURROUND, ENTER, STANDBY]

  - id: fpdwn
    label: Front Panel Button Down
    kind: action
    command: "RQST:CS:FPDWN:{key}\\r"
    params:
      - name: key
        type: enum
        values: [ZONE, PREVIEW, DISPLAY, SETUP, MENU, MUTE, VIDEO_PROFILE, AUDIO_PROFILE, SURROUND, ENTER, STANDBY]

  - id: fprpt
    label: Front Panel Button Repeat
    kind: action
    command: "RQST:CS:FPRPT:{key}\\r"
    params:
      - name: key
        type: enum
        values: [ZONE, PREVIEW, DISPLAY, SETUP, MENU, MUTE, VIDEO_PROFILE, AUDIO_PROFILE, SURROUND, ENTER, STANDBY]

  - id: fpup
    label: Front Panel Button Up
    kind: action
    command: "RQST:CS:FPUP:{key}\\r"
    params:
      - name: key
        type: enum
        values: [ZONE, PREVIEW, DISPLAY, SETUP, MENU, MUTE, VIDEO_PROFILE, AUDIO_PROFILE, SURROUND, ENTER, STANDBY]

  - id: fpact_ctl
    label: Front Panel Activity Rotator
    kind: action
    command: "RQST:CS:FPACT_CTL:{dir}\\r"
    params:
      - name: dir
        type: enum
        values: [CW, CCW]

  - id: fpvol_ctl
    label: Front Panel Volume Rotator
    kind: action
    command: "RQST:CS:FPVOL_CTL:{dir}\\r"
    params:
      - name: dir
        type: enum
        values: [CW, CCW, CW_FAST, CCW_FAST]

  - id: irdwnup
    label: IR Button Press-Release
    kind: action
    command: "RQST:CS:IRDWNUP:{key}\\r"
    params:
      - name: key
        type: enum
        values: [UP, DOWN, LEFT, RIGHT, ENTER, MENU, SETUP, ACTIVITY_UP, ACTIVITY_DOWN, SURROUND_UP, SURROUND_DOWN, VOLUME_UP, VOLUME_DOWN, VIDEO_PROFILE, AUDIO_PROFILE, PREVIEW, MUTE, F1, F2, F3, ZONE, STANDBY]

  - id: irdwn
    label: IR Button Down
    kind: action
    command: "RQST:CS:IRDWN:{key}\\r"
    params:
      - name: key
        type: enum
        values: [UP, DOWN, LEFT, RIGHT, ENTER, MENU, SETUP, ACTIVITY_UP, ACTIVITY_DOWN, SURROUND_UP, SURROUND_DOWN, VOLUME_UP, VOLUME_DOWN, VIDEO_PROFILE, AUDIO_PROFILE, PREVIEW, MUTE, F1, F2, F3, ZONE, STANDBY]

  - id: irrpt
    label: IR Button Repeat
    kind: action
    command: "RQST:CS:IRRPT:{key}\\r"
    params:
      - name: key
        type: enum
        values: [UP, DOWN, LEFT, RIGHT, ENTER, MENU, SETUP, ACTIVITY_UP, ACTIVITY_DOWN, SURROUND_UP, SURROUND_DOWN, VOLUME_UP, VOLUME_DOWN, VIDEO_PROFILE, AUDIO_PROFILE, PREVIEW, MUTE, F1, F2, F3, ZONE, STANDBY]

  - id: irup
    label: IR Button Up
    kind: action
    command: "RQST:CS:IRUP:{key}\\r"
    params:
      - name: key
        type: enum
        values: [UP, DOWN, LEFT, RIGHT, ENTER, MENU, SETUP, ACTIVITY_UP, ACTIVITY_DOWN, SURROUND_UP, SURROUND_DOWN, VOLUME_UP, VOLUME_DOWN, VIDEO_PROFILE, AUDIO_PROFILE, PREVIEW, MUTE, F1, F2, F3, ZONE, STANDBY]

  - id: ntf_enable
    label: Enable Command Notification
    kind: action
    command: "RQST:CS:{CMD}:EN\\r"
    params:
      - name: CMD
        type: string
        description: Any command that supports notifications (EN parameter)

  - id: ntf_disable
    label: Disable Command Notification
    kind: action
    command: "RQST:CS:{CMD}:DIS\\r"
    params:
      - name: CMD
        type: string
        description: Any command that supports notifications (DIS parameter)
```

## Feedbacks
```yaml
feedbacks:
  - id: pwr_state
    label: Power State
    query: "RQST:CS:PWR:?\\r"
    response: "RSP:CS:PWR:{state}\\r"
    type: enum
    values: [ON, STANDBY]

  - id: vol_level
    label: Volume Level
    query: "RQST:CS:VOL:?\\r"
    response: "RSP:CS:VOL:XXX.X\\r"
    type: float
    min: 0.0
    max: 100.0

  - id: mute_state
    label: Mute State
    query: "RQST:CS:MUTE:?\\r"
    response: "RSP:CS:MUTE:{state}\\r"
    type: enum
    values: [ON, OFF]

  - id: act_current
    label: Current Activity
    query: "RQST:CS:ACT:?\\r"
    response: "RSP:CS:ACT:{name}\\r"
    type: string

  - id: aprof_current
    label: Current Audio Profile
    query: "RQST:CS:APROF:?\\r"
    response: "RSP:CS:APROF:{name}\\r"
    type: string

  - id: vprof_current
    label: Current Video Profile
    query: "RQST:CS:VPROF:?\\r"
    response: "RSP:CS:VPROF:{name}\\r"
    type: string

  - id: dispcfg_current
    label: Current Display Configuration
    query: "RQST:CS:DISPCFG:?\\r"
    response: "RSP:CS:DISPCFG:{name}\\r"
    type: string

  - id: spkrcfg_current
    label: Current Speaker Configuration
    query: "RQST:CS:SPKRCFG:?\\r"
    response: "RSP:CS:SPKRCFG:{name}\\r"
    type: string

  - id: surrmode_current
    label: Current Surround Mode
    query: "RQST:CS:SURRMODE:?\\r"
    type: string

  - id: bal_current
    label: Current Balance
    query: "RQST:CS:BAL:?\\r"
    type: string
    description: "ROFF, LOFF, or -14.0 to 14.0"

  - id: fader_current
    label: Current Fader
    query: "RQST:CS:FADER:?\\r"
    type: string
    description: "FOFF, BOFF, or -14.0 to 14.0"

  - id: avsync_current
    label: Current AV Sync Delay
    query: "RQST:CS:AVSYNC:?\\r"
    type: float

  - id: resolution_current
    label: Current Resolution
    query: "RQST:CS:RESOLUTION:?\\r"
    type: enum
    values: [SD, ED, HD720P, HD1080I, HD1080P]

  - id: zoom_current
    label: Current Zoom
    query: "RQST:CS:ZOOM:?\\r"
    type: enum
    values: [NORM, WIDE, FILL, FW]

  - id: osd_state
    label: OSD State
    query: "RQST:CS:OSD:?\\r"
    type: enum
    values: [ON, OFF]

  - id: monen_state
    label: Monitor Output State
    query: "RQST:CS:MONEN:?\\r"
    type: enum
    values: [ON, OFF]

  - id: menubk_state
    label: Menu Backlight State
    query: "RQST:CS:MENUBK:?\\r"
    type: enum
    values: [ON, OFF]

  - id: fpdispintens_state
    label: Front Panel Display Intensity
    query: "RQST:CS:FPDISPINTENS:?\\r"
    type: enum
    values: [ON, OFF]

  - id: roomeqon_state
    label: Room EQ State
    query: "RQST:CS:ROOMEQON:?\\r"
    type: enum
    values: [ON, OFF]

  - id: roomeq_current
    label: Current Room EQ Config
    query: "RQST:CS:ROOMEQ:?\\r"
    type: string
    description: "OFF or 1-5"

  - id: encenter_state
    label: Center Speaker Enable State
    query: "RQST:CS:ENCENTER:?\\r"
    type: enum
    values: [ON, OFF]

  - id: ensurr_state
    label: Surround Speakers Enable State
    query: "RQST:CS:ENSURR:?\\r"
    type: enum
    values: [ON, OFF]

  - id: enrear_state
    label: Rear Speakers Enable State
    query: "RQST:CS:ENREAR:?\\r"
    type: enum
    values: [ON, OFF]

  - id: ensub1_state
    label: Subwoofer 1 Enable State
    query: "RQST:CS:ENSUB1:?\\r"
    type: enum
    values: [ON, OFF]

  - id: ensub2_state
    label: Subwoofer 2 Enable State
    query: "RQST:CS:ENSUB2:?\\r"
    type: enum
    values: [ON, OFF]

  - id: trigger_state
    label: Trigger State
    query: "RQST:CS:TRIGGER_{n}:?\\r"
    type: enum
    values: [ON, OFF]

  - id: z2act_current
    label: Current Zone 2 Activity
    query: "RQST:CS:Z2ACT:?\\r"
    type: string

  - id: z2vol_current
    label: Current Zone 2 Volume
    query: "RQST:CS:Z2VOL:?\\r"
    type: float

  - id: offset_current
    label: Current Speaker Offset
    query: "RQST:CS:{CHANNEL}:?\\r"
    type: string
    description: "OFF or -14.0 to 14.0 for OFFSETF, OFFSETC, OFFSETS, OFFSETR, OFFSETSUB1, OFFSETSUB2"

  - id: cal_dist_current
    label: Current Calibration Distance
    query: "RQST:CS:CAL_DIST_{CHANNEL}:?\\r"
    type: float
    description: 0.0 to 40.0 feet for LF, RF, C, LS, RS, LB, RB, LSUB1, RSUB1, LSUB2, RSUB2

  - id: cal_lvl_current
    label: Current Calibration Level
    query: "RQST:CS:CAL_LVL_{CHANNEL}:?\\r"
    type: float
    description: -14.0 to 14.0 for LF, RF, C, LS, RS, LB, RB, LSUB1, RSUB1, LSUB2, RSUB2

  - id: xover_current
    label: Current Crossover Setting
    query: "RQST:CS:XOVER_{CHANNEL}:?\\r"
    type: string
    description: "FULLSUB, FULL, or frequency for FRNT, CENTER, SURR, REAR"

  - id: xover_sub_current
    label: Current Subwoofer Crossover
    query: "RQST:CS:XOVER_SUB:?\\r"
    type: enum
    values: [FULL, COMP]

  - id: status_main
    label: Main Zone Status
    query: "RQST:CS:STATUS_MAIN:?\\r"
    type: string
    description: Comma-separated fields - video input resolution, output frame rate, color space, HDCP status, audio in, signal, sample rate, input channels, bit rate, EX encoded, 2.0 encoding, ES encoding, dialog offset, mix room, center mix level, surround mix level, word length

  - id: status_system
    label: System Status
    query: "RQST:CS:STATUS_SYSTEM:?\\r"
    type: string
    description: "MODEL, SW VERSION, TIME SINCE POWERUP (xx:xx:xx)"

  - id: status_zone2
    label: Zone 2 Status
    query: "RQST:CS:STATUS_ZONE2:?\\r"
    type: string
    description: Signal type

  - id: req_act_list
    label: Activity List
    query: "RQST:CS:REQ_ACT_LIST:?\\r"
    type: string
    description: Comma-separated activity names

  - id: req_aprof_list
    label: Audio Profile List
    query: "RQST:CS:REQ_APROF_LIST:?\\r"
    type: string
    description: Comma-separated audio profile names

  - id: req_disp_list
    label: Display Configuration List
    query: "RQST:CS:REQ_DISP_LIST:?\\r"
    type: string
    description: Comma-separated display configuration names

  - id: req_spkr_list
    label: Speaker Configuration List
    query: "RQST:CS:REQ_SPKR_LIST:?\\r"
    type: string
    description: Comma-separated speaker configuration names

  - id: req_surr_list
    label: Available Surround Modes
    query: "RQST:CS:REQ_SURR_LIST:?\\r"
    type: string
    description: Comma-separated currently available surround mode names

  - id: req_vprof_list
    label: Video Profile List
    query: "RQST:CS:REQ_VPROF_LIST:?\\r"
    type: string
    description: Comma-separated video profile names

  - id: ntf_state
    label: Notification State
    query: "RQST:CS:{CMD}:NTF?\\r"
    type: enum
    values: [EN, DIS]
    description: Query notification enabled/disabled state for any command that supports notifications
```

## Variables
```yaml
variables:
  - id: volume
    label: Main Zone Volume
    min: 0.0
    max: 100.0
    step: 0.1
    unit: dB

  - id: zone2_volume
    label: Zone 2 Volume
    min: 0.0
    max: 100.0
    step: 0.1
    unit: dB

  - id: balance
    label: Balance
    min: -14.0
    max: 14.0
    step: 0.1

  - id: fader
    label: Fader
    min: -14.0
    max: 14.0
    step: 0.1

  - id: avsync_delay
    label: AV Sync Delay
    min: 0.0
    max: 500.0
    step: 0.1
    unit: ms
```

## Events
```yaml
events:
  - id: ntf_power
    label: Power State Changed
    format: "NTF:{SRC}:PWR:{state}\\r"
    description: "SRC = UI or AV; state = ON or STANDBY. Notification must be enabled."

  - id: ntf_volume
    label: Volume Changed
    format: "NTF:{SRC}:VOL:{value}\\r"
    description: "SRC = UI or AV; value = XXX.X"

  - id: ntf_mute
    label: Mute State Changed
    format: "NTF:{SRC}:MUTE:{state}\\r"
    description: "SRC = UI or AV; state = ON or OFF"

  - id: ntf_activity
    label: Activity Changed
    format: "NTF:{SRC}:ACT:{name}\\r"
    description: "SRC = UI or AV; name = current activity"

  - id: ntf_fault_therm
    label: Thermal Fault
    format: "NTF:AV:FAULT:THERM\\r"
    description: Internal fan failed, system overheated

  - id: ntf_fault_pwr
    label: Power Fault
    format: "NTF:AV:FAULT:PWR\\r"
    description: Power fail condition

  - id: ntf_fault_signal
    label: Signal Fault
    format: "NTF:AV:FAULT:SIGNAL\\r"
    description: General signal fault with ML Net or Link2 devices

  - id: ntf_fault_unknown
    label: Software Fault
    format: "NTF:AV:FAULT:UNKNOWN\\r"
    description: System software fault - see front panel
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Most commands return NACK when system is in Standby; exceptions are FP/IR STANDBY key commands and PWR:ON"
  - description: "NTF:DIS_ALL_PERM irrevocably erases the notification database - no recovery except RESTORE_DEFAULT"
# UNRESOLVED: no explicit safety interlock procedures for power sequencing documented in source
```

## Notes
- Protocol format: `HDR:SRC:CMD:PARAM\r` — all fields case-sensitive, colon-separated, `\r` (0x0D) terminated.
- Max message size: 1024 characters including `\r`.
- Multiple parameters comma-separated; must be in order per command table.
- Response within 500ms expected; up to 3 WAIT responses then ERROR.
- Error responses: INVALID_SRC, INVALID_CMD, INVALID_PRM, INVALID_STR, INVALID_NAME, INVALID_MODE, NACK, WAIT/ERROR.
- Default control port is Ethernet; RS-232 selected via Setup menu.
- Ethernet: RJ-45, TCP (device = server), auto-negotiate 10/100 half/full duplex.
- Notifications must be explicitly enabled per command (EN/DIS); factory defaults listed in source section 10.
- Calibration distance commands always report in feet regardless of system unit setting.
- VOL and Z2VOL persistence only when Power On Volume set to "Last Level".
- See source section 7 for full persistent vs. non-persistent command retention table.
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: DHCP configuration details beyond "default behavior" not fully specified -->

## Provenance

```yaml
source_domains:
  - marklevinson.com
source_urls:
  - https://www.marklevinson.com/on/demandware.static/-/Sites-ML-US-NCOM-Library/default/dw3b18792f/glp/support/downloads/No502/Mark-Levinson-No502-Serial-Protocol.pdf
retrieved_at: 2026-05-02T20:26:18.740Z
last_checked_at: 2026-05-14T18:17:18.075Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.075Z
matched_actions: 63
action_count: 63
confidence: medium
summary: "All 105 spec actions matched source commands; FAULT and WAIT_TEST correctly omitted as non-controllable; all transport parameters verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- FAULT
- WAIT_TEST
- "no multi-step sequences described in source"
- "no explicit safety interlock procedures for power sequencing documented in source"
- "firmware version compatibility range not stated"
- "DHCP configuration details beyond \"default behavior\" not fully specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
