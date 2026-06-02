---
spec_id: admin/ad-notam-cs-101
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ad Notam CS-101 Control Spec"
manufacturer: "Ad Notam"
model_family: CS-101
aliases: []
compatible_with:
  manufacturers:
    - "Ad Notam"
  models:
    - CS-101
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ad-notam.com
  - cdn.shopify.com
  - configurator.ad-notam.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.ad-notam.com/download/RS232/ad_notam_RS232_protocol_DFU.pdf
  - https://cdn.shopify.com/s/files/1/0793/9768/3467/files/TD_DFU_RS232-Protocol_v5.2_ASCII_Format_20200504.pdf
  - https://configurator.ad-notam.com/service-support/product-support/notifications-technical-notes/control-integration
  - https://www.ad-notam.com/attachment/244/download/dfu_rs232_protocol_v03_01_20131111.pdf
  - https://applicationmarket.crestron.com/ad-notam-cs-101/
retrieved_at: 2026-06-01T22:37:06.903Z
last_checked_at: 2026-06-02T17:21:08.800Z
generated_at: 2026-06-02T17:21:08.800Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "source contains no safety warnings, interlock procedures, or power-on"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:08.800Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 spec actions matched literally in source table; transport parameters verified; 1-to-1 coverage. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Ad Notam CS-101 Control Spec

## Summary
Ad Notam CS-101 Display Frame Unit (DFU). RS-232 ASCII control protocol over a null-modem DB-9 cable, default 38400 baud 8N1, no handshake. Commands are 9-byte framed (`&IDN:VAL<CR>`) and acknowledged with `%IDN:VAL<CR>`; errors return `!ERR:NNN`. This spec catalogs every command row documented in the source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # default per source; 9600 and 19200 also supported, configurable via OSD service menu
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Power
- id: pwr_tog
  label: Power Toggle
  kind: action
  command: "&PWR:TOG"
  params: []
- id: pwr_on
  label: Power On
  kind: action
  command: "&PWR:ON*"
  params: []
- id: pwr_off
  label: Power Off
  kind: action
  command: "&PWR:OFF"
  params: []
- id: pwr_query
  label: Get Power Status
  kind: query
  command: "&PWR?***"
  params: []

# Boot behavior
- id: bot_on
  label: Boot Set to On
  kind: action
  command: "&BOT:ON*"
  params: []
- id: bot_sby
  label: Boot Set to Standby
  kind: action
  command: "&BOT:SBY"
  params: []
- id: bot_lst
  label: Boot Set to Last State
  kind: action
  command: "&BOT:LST"
  params: []
- id: bot_query
  label: Get Boot Setup
  kind: query
  command: "&BOT?***"
  params: []

# Signal loss timeout
- id: sls_05s
  label: Signal Loss 5 Seconds
  kind: action
  command: "&SLS:05s"
  params: []
- id: sls_10s
  label: Signal Loss 10 Seconds
  kind: action
  command: "&SLS:10s"
  params: []
- id: sls_30s
  label: Signal Loss 30 Seconds
  kind: action
  command: "&SLS:30s"
  params: []
- id: sls_01m
  label: Signal Loss 1 Minute
  kind: action
  command: "&SLS:01m"
  params: []
- id: sls_02m
  label: Signal Loss 2 Minutes
  kind: action
  command: "&SLS:02m"
  params: []
- id: sls_off
  label: Signal Loss Off
  kind: action
  command: "&SLS:OFF"
  params: []
- id: sls_query
  label: Get Signal Loss Setup
  kind: query
  command: "&SLS?***"
  params: []

# Sleep timer
- id: slp_015
  label: Sleep Timer 15 Minutes
  kind: action
  command: "&SLP:015"
  params: []
- id: slp_030
  label: Sleep Timer 30 Minutes
  kind: action
  command: "&SLP:030"
  params: []
- id: slp_045
  label: Sleep Timer 45 Minutes
  kind: action
  command: "&SLP:045"
  params: []
- id: slp_060
  label: Sleep Timer 60 Minutes
  kind: action
  command: "&SLP:060"
  params: []
- id: slp_090
  label: Sleep Timer 90 Minutes
  kind: action
  command: "&SLP:090"
  params: []
- id: slp_120
  label: Sleep Timer 120 Minutes
  kind: action
  command: "&SLP:120"
  params: []
- id: slp_off
  label: Sleep Timer Off
  kind: action
  command: "&SLP:OFF"
  params: []
- id: slp_query
  label: Get Sleep Timer Status
  kind: query
  command: "&SLP?***"
  params: []

# Numeric keypad digits
- id: num_001
  label: Digit 1
  kind: action
  command: "&NUM:001"
  params: []
- id: num_002
  label: Digit 2
  kind: action
  command: "&NUM:002"
  params: []
- id: num_003
  label: Digit 3
  kind: action
  command: "&NUM:003"
  params: []
- id: num_004
  label: Digit 4
  kind: action
  command: "&NUM:004"
  params: []
- id: num_005
  label: Digit 5
  kind: action
  command: "&NUM:005"
  params: []
- id: num_006
  label: Digit 6
  kind: action
  command: "&NUM:006"
  params: []
- id: num_007
  label: Digit 7
  kind: action
  command: "&NUM:007"
  params: []
- id: num_008
  label: Digit 8
  kind: action
  command: "&NUM:008"
  params: []
- id: num_009
  label: Digit 9
  kind: action
  command: "&NUM:009"
  params: []
- id: num_000
  label: Digit 0
  kind: action
  command: "&NUM:000"
  params: []

# Cursor / navigation
- id: crs_ok
  label: OK
  kind: action
  command: "&CRS:OK*"
  params: []
- id: crs_up
  label: Up
  kind: action
  command: "&CRS:UP*"
  params: []
- id: crs_dn
  label: Down
  kind: action
  command: "&CRS:DN*"
  params: []
- id: crs_lt
  label: Left
  kind: action
  command: "&CRS:LT*"
  params: []
- id: crs_rt
  label: Right
  kind: action
  command: "&CRS:RT*"
  params: []

# Volume
- id: vol_up
  label: Volume Up
  kind: action
  command: "&VOL:UP*"
  params: []
- id: vol_dn
  label: Volume Down
  kind: action
  command: "&VOL:DN*"
  params: []
- id: vol_query
  label: Get Volume Level
  kind: query
  command: "&VOL?***"
  params: []

# Mute
- id: mut_tog
  label: Mute Toggle
  kind: action
  command: "&MUT:TOG"
  params: []
- id: mut_on
  label: Mute On
  kind: action
  command: "&MUT:ON*"
  params: []
- id: mut_off
  label: Mute Off
  kind: action
  command: "&MUT:OFF"
  params: []
- id: mut_query
  label: Get Mute Status
  kind: query
  command: "&MUT?***"
  params: []

# Media transport
- id: fnc_ply
  label: Play
  kind: action
  command: "&FNC:PLY"
  params: []
- id: fnc_pse
  label: Pause
  kind: action
  command: "&FNC:PSE"
  params: []
- id: fnc_stp
  label: Stop
  kind: action
  command: "&FNC:STP"
  params: []
- id: fnc_nxt
  label: Skip Forward / Chapter +
  kind: action
  command: "&FNC:NXT"
  params: []
- id: fnc_prv
  label: Skip Backward / Chapter -
  kind: action
  command: "&FNC:PRV"
  params: []
- id: fnc_fwd
  label: Fast Forward
  kind: action
  command: "&FNC:FWD"
  params: []
- id: fnc_rwd
  label: Fast Backward
  kind: action
  command: "&FNC:RWD"
  params: []

# Exit
- id: ext
  label: Exit
  kind: action
  command: "&EXT:***"
  params: []

# OSD access
- id: osa_on
  label: OSD Access On
  kind: action
  command: "&OSA:ON*"
  params: []
- id: osa_off
  label: OSD Access Off
  kind: action
  command: "&OSA:OFF"
  params: []
- id: osa_query
  label: Get OSD Access Status
  kind: query
  command: "&OSA?***"
  params: []

# OSD open/close
- id: osd_tog
  label: OSD Toggle (Open/Close)
  kind: action
  command: "&OSD:TOG"
  params: []
- id: osd_on
  label: OSD On (Open)
  kind: action
  command: "&OSD:ON*"
  params: []
- id: osd_off
  label: OSD Off (Close)
  kind: action
  command: "&OSD:OFF"
  params: []
- id: osd_query
  label: Get OSD Status
  kind: query
  command: "&OSD?***"
  params: []

# Input source
- id: src_hd1
  label: Input HDMI 1
  kind: action
  command: "&SRC:HD1"
  params: []
- id: src_hd2
  label: Input HDMI 2
  kind: action
  command: "&SRC:HD2"
  params: []
- id: src_hd3
  label: Input HDMI 3
  kind: action
  command: "&SRC:HD3"
  params: []
- id: src_rgb
  label: Input Component
  kind: action
  command: "&SRC:RGB"
  params: []
- id: src_usb
  label: Input USB / DMP
  kind: action
  command: "&SRC:USB"
  params: []
- id: src_query
  label: Get Input Status
  kind: query
  command: "&SRC?***"
  params: []

# Aspect / zoom
- id: asp_169
  label: Aspect 16:9
  kind: action
  command: "&ASP:169"
  params: []
- id: asp_043
  label: Aspect 4:3
  kind: action
  command: "&ASP:043"
  params: []
- id: asp_zm1
  label: Zoom 1
  kind: action
  command: "&ASP:ZM1"
  params: []
- id: asp_zm2
  label: Zoom 2
  kind: action
  command: "&ASP:ZM2"
  params: []
- id: asp_query
  label: Get Aspect Status
  kind: query
  command: "&ASP?***"
  params: []

# Picture mode and color temp
- id: pct_std
  label: Picture Mode Standard
  kind: action
  command: "&PCT:STD"
  params: []
- id: pct_usr
  label: Picture Mode User
  kind: action
  command: "&PCT:USR"
  params: []
- id: pct_dyn
  label: Picture Mode Dynamic
  kind: action
  command: "&PCT:DYN"
  params: []
- id: pct_mld
  label: Picture Mode Mild
  kind: action
  command: "&PCT:MLD"
  params: []
- id: pct_col
  label: Picture Temp Cool
  kind: action
  command: "&PCT:COL"
  params: []
- id: pct_med
  label: Picture Temp Medium
  kind: action
  command: "&PCT:MED"
  params: []
- id: pct_wrm
  label: Picture Temp Warm
  kind: action
  command: "&PCT:WRM"
  params: []

# Brightness
- id: brt_up
  label: Brightness Up
  kind: action
  command: "&BRT:UP*"
  params: []
- id: brt_dn
  label: Brightness Down
  kind: action
  command: "&BRT:DN*"
  params: []
- id: brt_query
  label: Get Brightness Level
  kind: query
  command: "&BRT?***"
  params: []

# Contrast
- id: con_up
  label: Contrast Up
  kind: action
  command: "&CON:UP*"
  params: []
- id: con_dn
  label: Contrast Down
  kind: action
  command: "&CON:DN*"
  params: []
- id: con_query
  label: Get Contrast Level
  kind: query
  command: "&CON?***"
  params: []

# Saturation
- id: str_up
  label: Saturation Up
  kind: action
  command: "&STR:UP*"
  params: []
- id: str_dn
  label: Saturation Down
  kind: action
  command: "&STR:DN*"
  params: []
- id: str_query
  label: Get Saturation Level
  kind: query
  command: "&STR?***"
  params: []

# Sharpness
- id: srp_up
  label: Sharpness Up
  kind: action
  command: "&SRP:UP*"
  params: []
- id: srp_dn
  label: Sharpness Down
  kind: action
  command: "&SRP:DN*"
  params: []
- id: srp_query
  label: Get Sharpness Level
  kind: query
  command: "&SRP?***"
  params: []

# Backlight
- id: blt_up
  label: Backlight Up
  kind: action
  command: "&BLT:UP*"
  params: []
- id: blt_dn
  label: Backlight Down
  kind: action
  command: "&BLT:DN*"
  params: []
- id: blt_query
  label: Get Backlight Level
  kind: query
  command: "&BLT?***"
  params: []

# Audio mode
- id: aud_std
  label: Audio Mode Standard
  kind: action
  command: "&AUD:STD"
  params: []
- id: aud_usr
  label: Audio Mode User
  kind: action
  command: "&AUD:USR"
  params: []
- id: aud_mus
  label: Audio Mode Music
  kind: action
  command: "&AUD:MUS"
  params: []
- id: aud_mov
  label: Audio Mode Movie
  kind: action
  command: "&AUD:MOV"
  params: []
- id: aud_spr
  label: Audio Mode Sports
  kind: action
  command: "&AUD:SPR"
  params: []

# Bass
- id: bas_up
  label: Bass Up
  kind: action
  command: "&BAS:UP*"
  params: []
- id: bas_dn
  label: Bass Down
  kind: action
  command: "&BAS:DN*"
  params: []
- id: bas_query
  label: Get Bass Level
  kind: query
  command: "&BAS?***"
  params: []

# Treble
- id: trb_up
  label: Treble Up
  kind: action
  command: "&TRB:UP*"
  params: []
- id: trb_dn
  label: Treble Down
  kind: action
  command: "&TRB:DN*"
  params: []
- id: trb_query
  label: Get Treble Level
  kind: query
  command: "&TRB?***"
  params: []

# Balance
- id: bal_lt
  label: Balance Left
  kind: action
  command: "&BAL:LT*"
  params: []
- id: bal_rt
  label: Balance Right
  kind: action
  command: "&BAL:RT*"
  params: []
- id: bal_query
  label: Get Balance Level
  kind: query
  command: "&BAL?***"
  params: []

# Boot volume
- id: bvl_up
  label: Boot Volume Up
  kind: action
  command: "&BVL:UP*"
  params: []
- id: bvl_dn
  label: Boot Volume Down
  kind: action
  command: "&BVL:DN*"
  params: []
- id: bvl_query
  label: Get Boot Volume Level
  kind: query
  command: "&BVL?***"
  params: []

# RS232 echo
- id: eco_on
  label: Set RS232 Echo On
  kind: action
  command: "&ECO:ON*"
  params: []
- id: eco_off
  label: Set RS232 Echo Off
  kind: action
  command: "&ECO:OFF"
  params: []
```

## Feedbacks
```yaml
# Acknowledgement pattern: %IDN:VAL<CR>, 9 bytes, value field padded with '*' to 3 bytes.
# Error pattern: !ERR:NNN<CR>
- id: pwr_state
  type: enum
  values: [on, off]
  pattern: "%PWR:XXX"
- id: bot_state
  type: enum
  values: [on, standby, last]
  pattern: "%BOT:XXX"
- id: sls_state
  type: enum
  values: ["5s", "10s", "30s", "1m", "2m", off]
  pattern: "%SLS:XXX"
- id: slp_state
  type: enum
  values: ["15min", "30min", "45min", "60min", "90min", "120min", off]
  pattern: "%SLP:XXX"
- id: vol_level
  type: integer
  range: [0, 100]
  pattern: "%VOL:XXX"
- id: mut_state
  type: enum
  values: [on, off]
  pattern: "%MUT:XXX"
- id: osa_state
  type: enum
  values: [on, off]
  pattern: "%OSA:XXX"
- id: osd_state
  type: enum
  values: [on, off]
  pattern: "%OSD:XXX"
- id: src_state
  type: enum
  values: [hd1, hd2, hd3, rgb, usb]
  pattern: "%SRC:XXX"
- id: asp_state
  type: enum
  values: ["169", "043", "zm1", "zm2"]
  pattern: "%ASP:XXX"
- id: brt_level
  type: integer
  range: [0, 100]
  pattern: "%BRT:XXX"
- id: con_level
  type: integer
  range: [0, 100]
  pattern: "%CON:XXX"
- id: str_level
  type: integer
  range: [0, 100]
  pattern: "%STR:XXX"
- id: srp_level
  type: integer
  range: [0, 100]
  pattern: "%SRP:XXX"
- id: blt_level
  type: integer
  range: [0, 100]
  pattern: "%BLT:XXX"
- id: bas_level
  type: integer
  range: [0, 100]
  pattern: "%BAS:XXX"
- id: trb_level
  type: integer
  range: [0, 100]
  pattern: "%TRB:XXX"
- id: bal_level
  type: integer
  range: [-50, 50]
  pattern: "%BAL:XXX"
- id: bvl_level
  type: integer
  range: [0, 100]
  pattern: "%BVL:XXX"
- id: error_code
  type: enum
  values: ["001", "002", "003", "004"]
  pattern: "!ERR:NNN"
```

## Variables
```yaml
# Settable parameters that have a queryable numeric range and step-style UP/DN controls.
# The source documents range bounds; no continuous set command is provided for these -
# only UP/DN step commands. Listed here for range metadata.
- id: vol
  label: Volume
  type: integer
  range: [0, 100]
  controlled_by: [vol_up, vol_dn, vol_query]
- id: brt
  label: Brightness
  type: integer
  range: [0, 100]
  controlled_by: [brt_up, brt_dn, brt_query]
- id: con
  label: Contrast
  type: integer
  range: [0, 100]
  controlled_by: [con_up, con_dn, con_query]
- id: str
  label: Saturation
  type: integer
  range: [0, 100]
  controlled_by: [str_up, str_dn, str_query]
- id: srp
  label: Sharpness
  type: integer
  range: [0, 100]
  controlled_by: [srp_up, srp_dn, srp_query]
- id: blt
  label: Backlight
  type: integer
  range: [0, 100]
  controlled_by: [blt_up, blt_dn, blt_query]
- id: bas
  label: Bass
  type: integer
  range: [0, 100]
  controlled_by: [bas_up, bas_dn, bas_query]
- id: trb
  label: Treble
  type: integer
  range: [0, 100]
  controlled_by: [trb_up, trb_dn, trb_query]
- id: bal
  label: Balance
  type: integer
  range: [-50, 50]
  controlled_by: [bal_lt, bal_rt, bal_query]
- id: bvl
  label: Boot Volume
  type: integer
  range: [0, 100]
  controlled_by: [bvl_up, bvl_dn, bvl_query]
```

## Events
```yaml
# Unsolicited notifications. Source documents acknowledgement (response) per command but
# no asynchronous event/notification stream beyond that. ECHO controls whether acks are sent.
- id: echo_disabled
  label: RS232 Echo Disabled
  description: When ECHO is OFF, the device does not send acknowledgement messages after commands.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements beyond the timing note "wait 10 seconds after power on
# before sending next command" - that is a timing constraint, not a safety interlock.
```

## Notes
Every command and acknowledgement is exactly 9 bytes including the trailing `<CR>` (0x0D). The value field is always 3 bytes; values shorter than 3 characters are right-padded with `*`. Commands use no whitespace between fields. Acknowledgement is controlled by the `&ECO:ON*` / `&ECO:OFF` pair — when echo is off the device does not reply to commands. Errors are reported with the `!ERR:NNN<CR>` pattern (codes 001 access denied, 002 not available, 003 not implemented, 004 value out of range). Host connection is a null-modem DB-9 cable (2↔3, 5↔5). Default baud is 38400; 9600 and 19200 are also supported and selectable from the OSD service menu. Timing: 10s after power-on, 500ms minimum between commands, 2s retry on no-response, 5s after 20-command bursts.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - ad-notam.com
  - cdn.shopify.com
  - configurator.ad-notam.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.ad-notam.com/download/RS232/ad_notam_RS232_protocol_DFU.pdf
  - https://cdn.shopify.com/s/files/1/0793/9768/3467/files/TD_DFU_RS232-Protocol_v5.2_ASCII_Format_20200504.pdf
  - https://configurator.ad-notam.com/service-support/product-support/notifications-technical-notes/control-integration
  - https://www.ad-notam.com/attachment/244/download/dfu_rs232_protocol_v03_01_20131111.pdf
  - https://applicationmarket.crestron.com/ad-notam-cs-101/
retrieved_at: 2026-06-01T22:37:06.903Z
last_checked_at: 2026-06-02T17:21:08.800Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:08.800Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 spec actions matched literally in source table; transport parameters verified; 1-to-1 coverage. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "source contains no safety warnings, interlock procedures, or power-on"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
