---
spec_id: admin/benq-rpxxxxk-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "BenQ RPxxxxK Series Control Spec"
manufacturer: BenQ
model_family: "BenQ RPxxxxK Series"
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - "BenQ RPxxxxK Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - benqimage.blob.core.windows.net
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - "https://esupportdownload.benq.com/esupport/PUBLIC%20DISPLAY%20PRODUCT/Control%20Protocols/RP6503/RS232&LAN%20Command%20List_v20231114_Others.pdf"
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T11:59:49.267Z
last_checked_at: 2026-07-21T21:36:48.959Z
generated_at: 2026-07-21T21:36:48.959Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model number exact resolution (xxxxxK placeholder in source); UNRESOLVED: HDBaseT control protocol details beyond COM port mention; UNRESOLVED: 3D Sync nVIDIA and 2D to 3D not supported per source; UNRESOLVED: source document covers MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534 projectors — command applicability to RPxxxxK panels inferred from shared BenQ RS232 dialect"
  - "configurable 9600/14400/19200/38400/57600/115200 bps; no single default stated"
  - "no unsolicited event notifications documented"
  - "no multi-step macro sequences documented"
  - "standby network/microphone settings not supported on source-listed models (per source); UNRESOLVED: Lamp2 hour not supported (per source); UNRESOLVED: LampSaver mode not supported (per source); UNRESOLVED: projection log in code not supported (per source); UNRESOLVED: broadcasting not supported (per source); UNRESOLVED: AMX device discovery not supported (per source); UNRESOLVED: MAC address query not supported (per source); UNRESOLVED: remote receiver not supported (per source); UNRESOLVED: microphone volume not supported (per source); UNRESOLVED: source document model mismatch — guide covers MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534, not RPxxxxK directly; UNRESOLVED: exact RPxxxxK model resolution and firmware version not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:36:48.959Z
  matched_actions: 77
  action_count: 77
  confidence: medium
  summary: "All 77 spec actions matched literally in source; full command coverage (77/77) with no drift; transport parameters (port 8000, 8-bit data, no parity, 1 stop bit) verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# BenQ RPxxxxK Series Control Spec

## Summary
BenQ RPxxxxK Series interactive flat panel display. Supports RS-232 serial and TCP/IP control via LAN (port 8000) and HDBaseT. Command format identical across all transport layers. No authentication required.

<!-- UNRESOLVED: device model number exact resolution (xxxxxK placeholder in source); UNRESOLVED: HDBaseT control protocol details beyond COM port mention; UNRESOLVED: 3D Sync nVIDIA and 2D to 3D not supported per source; UNRESOLVED: source document covers MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534 projectors — command applicability to RPxxxxK panels inferred from shared BenQ RS232 dialect -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # TCP port for RS232 via LAN (stated in source)
serial:
  baud_rate: null  # UNRESOLVED: configurable 9600/14400/19200/38400/57600/115200 bps; no single default stated
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
# All commands wrapped with <CR> delimiters per source. Over LAN the leading/
# trailing <CR> is optional (see Notes). Values verbatim from source command table.
# "Support: No" entries are retained where source documents the opcode (may apply
# to other models in the family).

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "<CR>*pow=on#<CR>"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "<CR>*pow=off#<CR>"
  params: []

# --- Source Selection (single opcode *sour=, value-variants do not multiply) ---
- id: source_select
  label: Select Source
  kind: action
  command: "<CR>*sour={source}#<CR>"
  params:
    - name: source
      type: string
      description: Source identifier (RGB, RGB2, RGB3, ypbr, ypbr2, dviA, dvid, hdmi, hdmi2, vid, svid, network, usbdisplay, usbreader, wireless, hdbaset, dp)

# --- Audio ---
- id: mute_on
  label: Mute On
  kind: action
  command: "<CR>*mute=on#<CR>"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "<CR>*mute=off#<CR>"
  params: []
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "<CR>*vol={direction}#<CR>"
  params:
    - name: direction
      type: string
      enum: ["+", "-"]
- id: mic_volume_adjust
  label: Microphone Volume Adjust
  kind: action
  command: "<CR>*micvol={direction}#<CR>"
  params:
    - name: direction
      type: string
      enum: ["+", "-"]
- id: audio_source_select
  label: Audio Source Select
  kind: action
  command: "<CR>*audiosour={source}#<CR>"
  params:
    - name: source
      type: string
      description: Audio source (off, RGB, RGB2, vid, ypbr, hdmi, hdmi2)

# --- Picture Mode ---
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: "<CR>*appmod={mode}#<CR>"
  params:
    - name: mode
      type: string
      description: Picture mode (dynamic, preset, srgb, bright, livingroom, game, cine, std, football, dicom, user1, user2, user3, isfday, isfnight, threed)

# --- Picture Settings ---
- id: contrast_adjust
  label: Contrast Adjust
  kind: action
  command: "<CR>*con={direction}#<CR>"
  params:
    - name: direction
      type: string
      enum: ["+", "-"]
- id: brightness_adjust
  label: Brightness Adjust
  kind: action
  command: "<CR>*bri={direction}#<CR>"
  params:
    - name: direction
      type: string
      enum: ["+", "-"]
- id: color_adjust
  label: Color Adjust
  kind: action
  command: "<CR>*color={direction}#<CR>"
  params:
    - name: direction
      type: string
      enum: ["+", "-"]
- id: sharpness_adjust
  label: Sharpness Adjust
  kind: action
  command: "<CR>*sharp={direction}#<CR>"
  params:
    - name: direction
      type: string
      enum: ["+", "-"]
- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  command: "<CR>*ct={temperature}#<CR>"
  params:
    - name: temperature
      type: string
      description: Color temperature (warmer, warm, normal, cool, cooler, native)

# --- Aspect / Zoom / Auto ---
- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  command: "<CR>*asp={ratio}#<CR>"
  params:
    - name: ratio
      type: string
      description: Aspect ratio (4:3, 16:6, 16:9, 16:10, AUTO, REAL, LBOX, WIDE, ANAM)
- id: zoom_in
  label: Digital Zoom In
  kind: action
  command: "<CR>*zoomI#<CR>"
  params: []
- id: zoom_out
  label: Digital Zoom Out
  kind: action
  command: "<CR>*zoomO#<CR>"
  params: []
- id: auto_adjust
  label: Auto Adjust
  kind: action
  command: "<CR>*auto#<CR>"
  params: []

# --- Operation Settings ---
- id: brilliant_color_set
  label: Set Brilliant Color
  kind: action
  command: "<CR>*BC={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: projector_position_set
  label: Set Projector Position
  kind: action
  command: "<CR>*pp={position}#<CR>"
  params:
    - name: position
      type: string
      description: Position (FT, RE, RC, FC)
- id: quick_auto_search_set
  label: Set Quick Auto Search
  kind: action
  command: "<CR>*QAS={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: direct_power_on_set
  label: Set Direct Power On
  kind: action
  command: "<CR>*directpower={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: signal_power_on_set
  label: Set Signal Power On
  kind: action
  command: "<CR>*autopower={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: standby_network_set
  label: Set Standby Network
  kind: action
  command: "<CR>*standbynet={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: standby_microphone_set
  label: Set Standby Microphone
  kind: action
  command: "<CR>*standbymic={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: standby_monitor_out_set
  label: Set Standby Monitor Out
  kind: action
  command: "<CR>*standbymnt={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]

# --- Baud Rate ---
- id: baud_rate_set
  label: Set Baud Rate
  kind: action
  command: "<CR>*baud={rate}#<CR>"
  params:
    - name: rate
      type: integer
      description: Baud rate (2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200)

# --- Lamp Control ---
- id: lamp_mode_set
  label: Set Lamp Mode
  kind: action
  command: "<CR>*lampm={mode}#<CR>"
  params:
    - name: mode
      type: string
      description: Lamp mode (lnor, eco, seco, seco2, seco3, dimming, custom, dualbr, dualre, single, singleeco)
- id: lamp_saver_set
  label: Set LampSaver Mode
  kind: action
  command: "<CR>*lpsaver={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]

# --- Miscellaneous ---
- id: blank_set
  label: Set Blank
  kind: action
  command: "<CR>*blank={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: freeze_set
  label: Set Freeze
  kind: action
  command: "<CR>*freeze={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: menu_set
  label: Set Menu
  kind: action
  command: "<CR>*menu={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: menu_navigate
  label: Menu Navigation
  kind: action
  command: "<CR>*{direction}#<CR>"
  params:
    - name: direction
      type: string
      enum: [up, down, right, left, enter]
- id: threed_sync_set
  label: Set 3D Sync
  kind: action
  command: "<CR>*3d={mode}#<CR>"
  params:
    - name: mode
      type: string
      description: 3D sync mode (off, auto, tb, fs, fp, sbs, da, iv, 2d3d, nvidia)
- id: remote_receiver_set
  label: Set Remote Receiver
  kind: action
  command: "<CR>*rr={receiver}#<CR>"
  params:
    - name: receiver
      type: string
      description: Remote receiver mode (fr, f, r, t, tf, tr)
- id: instant_on_set
  label: Set Instant On
  kind: action
  command: "<CR>*ins={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: high_altitude_set
  label: Set High Altitude Mode
  kind: action
  command: "<CR>*Highaltitude={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]

# --- Network / Discovery (documented in source, support varies by model) ---
- id: projection_login_code_set
  label: Set Projection Log In Code
  kind: action
  command: "<CR>*prjlogincode={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: broadcasting_set
  label: Set Broadcasting
  kind: action
  command: "<CR>*broadcasting={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]
- id: amx_device_discovery_set
  label: Set AMX Device Discovery
  kind: action
  command: "<CR>*amxdd={state}#<CR>"
  params:
    - name: state
      type: string
      enum: [on, off]

# --- Query actions (kind: query) - one per Read row in source command table ---
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "<CR>*pow=?#<CR>"
  params: []
- id: current_source_query
  label: Current Source Query
  kind: query
  command: "<CR>*sour=?#<CR>"
  params: []
- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "<CR>*mute=?#<CR>"
  params: []
- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "<CR>*vol=?#<CR>"
  params: []
- id: mic_volume_status_query
  label: Microphone Volume Status Query
  kind: query
  command: "<CR>*micvol=?#<CR>"
  params: []
- id: audio_source_status_query
  label: Audio Source Status Query
  kind: query
  command: "<CR>*audiosour=?#<CR>"
  params: []
- id: picture_mode_status_query
  label: Picture Mode Status Query
  kind: query
  command: "<CR>*appmod=?#<CR>"
  params: []
- id: contrast_status_query
  label: Contrast Value Query
  kind: query
  command: "<CR>*con=?#<CR>"
  params: []
- id: brightness_status_query
  label: Brightness Value Query
  kind: query
  command: "<CR>*bri=?#<CR>"
  params: []
- id: color_status_query
  label: Color Value Query
  kind: query
  command: "<CR>*color=?#<CR>"
  params: []
- id: sharpness_status_query
  label: Sharpness Value Query
  kind: query
  command: "<CR>*sharp=?#<CR>"
  params: []
- id: color_temperature_status_query
  label: Color Temperature Status Query
  kind: query
  command: "<CR>*ct=?#<CR>"
  params: []
- id: aspect_status_query
  label: Aspect Status Query
  kind: query
  command: "<CR>*asp=?#<CR>"
  params: []
- id: brilliant_color_status_query
  label: Brilliant Color Status Query
  kind: query
  command: "<CR>*BC=?#<CR>"
  params: []
- id: projector_position_status_query
  label: Projector Position Status Query
  kind: query
  command: "<CR>*pp=?#<CR>"
  params: []
- id: quick_auto_search_status_query
  label: Quick Auto Search Status Query
  kind: query
  command: "<CR>*QAS=?#<CR>"
  params: []
- id: direct_power_on_status_query
  label: Direct Power On Status Query
  kind: query
  command: "<CR>*directpower=?#<CR>"
  params: []
- id: signal_power_on_status_query
  label: Signal Power On Status Query
  kind: query
  command: "<CR>*autopower=?#<CR>"
  params: []
- id: standby_network_status_query
  label: Standby Network Status Query
  kind: query
  command: "<CR>*standbynet=?#<CR>"
  params: []
- id: standby_microphone_status_query
  label: Standby Microphone Status Query
  kind: query
  command: "<CR>*standbymic=?#<CR>"
  params: []
- id: standby_monitor_out_status_query
  label: Standby Monitor Out Status Query
  kind: query
  command: "<CR>*standbymnt=?#<CR>"
  params: []
- id: baud_rate_status_query
  label: Current Baud Rate Query
  kind: query
  command: "<CR>*baud=?#<CR>"
  params: []
- id: lamp_hour_query
  label: Lamp Hour Query
  kind: query
  command: "<CR>*ltim=?#<CR>"
  params: []
- id: lamp2_hour_query
  label: Lamp2 Hour Query
  kind: query
  command: "<CR>*ltim2=?#<CR>"
  params: []
- id: lamp_mode_status_query
  label: Lamp Mode Status Query
  kind: query
  command: "<CR>*lampm=?#<CR>"
  params: []
- id: model_name_query
  label: Model Name Query
  kind: query
  command: "<CR>*modelname=?#<CR>"
  params: []
- id: blank_status_query
  label: Blank Status Query
  kind: query
  command: "<CR>*blank=?#<CR>"
  params: []
- id: freeze_status_query
  label: Freeze Status Query
  kind: query
  command: "<CR>*freeze=?#<CR>"
  params: []
- id: threed_sync_status_query
  label: 3D Sync Status Query
  kind: query
  command: "<CR>*3d=?#<CR>"
  params: []
- id: remote_receiver_status_query
  label: Remote Receiver Status Query
  kind: query
  command: "<CR>*rr=?#<CR>"
  params: []
- id: instant_on_status_query
  label: Instant On Status Query
  kind: query
  command: "<CR>*ins=?#<CR>"
  params: []
- id: lamp_saver_status_query
  label: Lamp Saver Mode Status Query
  kind: query
  command: "<CR>*lpsaver=?#<CR>"
  params: []
- id: projection_login_code_status_query
  label: Projection Log In Code Status Query
  kind: query
  command: "<CR>*prjlogincode=?#<CR>"
  params: []
- id: broadcasting_status_query
  label: Broadcasting Status Query
  kind: query
  command: "<CR>*broadcasting=?<CR>"
  params: []
- id: amx_device_discovery_status_query
  label: AMX Device Discovery Status Query
  kind: query
  command: "<CR>*amxdd=?#<CR>"
  params: []
- id: mac_address_query
  label: MAC Address Query
  kind: query
  command: "<CR>*macaddr=?#<CR>"
  params: []
- id: high_altitude_status_query
  label: High Altitude Mode Status Query
  kind: query
  command: "<CR>*Highaltitude=?#<CR>"
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [on, off]
  query: "*pow=?#"
- id: current_source
  label: Current Source
  type: string
  query: "*sour=?#"
- id: mute_status
  label: Mute Status
  type: enum
  values: [on, off]
  query: "*mute=?#"
- id: volume_status
  label: Volume Status
  type: integer
  query: "*vol=?#"
- id: mic_volume_status
  label: Microphone Volume Status
  type: integer
  query: "*micvol=?#"
- id: audio_pass_status
  label: Audio Pass Status
  type: string
  query: "*audiosour=?#"
- id: picture_mode_status
  label: Picture Mode Status
  type: string
  query: "*appmod=?#"
- id: contrast_value
  label: Contrast Value
  type: integer
  query: "*con=?#"
- id: brightness_value
  label: Brightness Value
  type: integer
  query: "*bri=?#"
- id: color_value
  label: Color Value
  type: integer
  query: "*color=?#"
- id: sharpness_value
  label: Sharpness Value
  type: integer
  query: "*sharp=?#"
- id: color_temperature_status
  label: Color Temperature Status
  type: string
  query: "*ct=?#"
- id: aspect_status
  label: Aspect Status
  type: string
  query: "*asp=?#"
- id: brilliant_color_status
  label: Brilliant Color Status
  type: enum
  values: [on, off]
  query: "*BC=?#"
- id: projector_position_status
  label: Projector Position Status
  type: string
  query: "*pp=?#"
- id: quick_auto_search_status
  label: Quick Auto Search Status
  type: enum
  values: [on, off]
  query: "*QAS=?#"
- id: direct_power_on_status
  label: Direct Power On Status
  type: enum
  values: [on, off]
  query: "*directpower=?#"
- id: signal_power_on_status
  label: Signal Power On Status
  type: enum
  values: [on, off]
  query: "*autopower=?#"
- id: standby_network_status
  label: Standby Network Status
  type: enum
  values: [on, off]
  query: "*standbynet=?#"
- id: standby_microphone_status
  label: Standby Microphone Status
  type: enum
  values: [on, off]
  query: "*standbymic=?#"
- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  type: enum
  values: [on, off]
  query: "*standbymnt=?#"
- id: current_baud_rate
  label: Current Baud Rate
  type: integer
  query: "*baud=?#"
- id: lamp_hour
  label: Lamp Hour
  type: integer
  query: "*ltim=?#"
- id: lamp2_hour
  label: Lamp2 Hour
  type: integer
  query: "*ltim2=?#"
- id: lamp_mode_status
  label: Lamp Mode Status
  type: string
  query: "*lampm=?#"
- id: model_name
  label: Model Name
  type: string
  query: "*modelname=?#"
- id: blank_status
  label: Blank Status
  type: enum
  values: [on, off]
  query: "*blank=?#"
- id: freeze_status
  label: Freeze Status
  type: enum
  values: [on, off]
  query: "*freeze=?#"
- id: threed_sync_status
  label: 3D Sync Status
  type: string
  query: "*3d=?#"
- id: remote_receiver_status
  label: Remote Receiver Status
  type: string
  query: "*rr=?#"
- id: instant_on_status
  label: Instant On Status
  type: enum
  values: [on, off]
  query: "*ins=?#"
- id: lamp_saver_status
  label: Lamp Saver Status
  type: enum
  values: [on, off]
  query: "*lpsaver=?#"
- id: prjlogincode_status
  label: Projection Log In Code Status
  type: enum
  values: [on, off]
  query: "*prjlogincode=?#"
- id: broadcasting_status
  label: Broadcasting Status
  type: enum
  values: [on, off]
  query: "*broadcasting=?<CR>"
- id: amx_discovery_status
  label: AMX Device Discovery Status
  type: enum
  values: [on, off]
  query: "*amxdd=?#"
- id: mac_address
  label: MAC Address
  type: string
  query: "*macaddr=?#"
- id: high_altitude_status
  label: High Altitude Mode Status
  type: enum
  values: [on, off]
  query: "*Highaltitude=?#"
```

## Variables
```yaml
# All settable parameters exposed via query commands are listed in Feedbacks.
# No discrete variables outside Action/Feedback scope identified.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Command echo responses: "Illegal format" (malformed command), "Unsupported item" (invalid for model), "Block item" (cannot execute under current condition).

Commands accepted in uppercase, lowercase, or mixed case.

RS232 via LAN: commands work with or without `<CR>` delimiters when sent over TCP. Over serial, commands are wrapped with `<CR>` (carriage return, 0x0D) at both ends as shown in the command table.

Source command table "Support" column indicates per-model availability for the MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534 projectors; opcodes marked "No" are retained here where documented because they may apply to other models in the BenQ RS232 family.

Lamp dual-lamp mode opcodes (dualbr/dualre/single/singleeco) appear in source with irregular spacing (e.g. `* lampm =dualbr#`); normalized here to `*lampm=dualbr#` matching the rest of the lampm row family.

<!-- UNRESOLVED: standby network/microphone settings not supported on source-listed models (per source); UNRESOLVED: Lamp2 hour not supported (per source); UNRESOLVED: LampSaver mode not supported (per source); UNRESOLVED: projection log in code not supported (per source); UNRESOLVED: broadcasting not supported (per source); UNRESOLVED: AMX device discovery not supported (per source); UNRESOLVED: MAC address query not supported (per source); UNRESOLVED: remote receiver not supported (per source); UNRESOLVED: microphone volume not supported (per source); UNRESOLVED: source document model mismatch — guide covers MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534, not RPxxxxK directly; UNRESOLVED: exact RPxxxxK model resolution and firmware version not stated -->
````

Upgrade done. Key adds:
- `command:` payload on every action (was zero — critical implementability gap)
- 7 new set/discrete actions: `mic_volume_adjust`, `standby_network_set`, `standby_microphone_set`, `lamp_saver_set`, `projection_login_code_set`, `broadcasting_set`, `amx_device_discovery_set` (all documented in source, missing before)
- 36 query actions (`kind: query`) — source Read rows, were only in Feedbacks
- 3 new feedbacks: `mic_volume_status`, `standby_network_status`, `standby_microphone_status`
- revision bumped 1→2, provenance note on source/RPxxxxK model mismatch added

Preserved: all original IDs, transport block, traits, feedback shapes.

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - benqimage.blob.core.windows.net
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - "https://esupportdownload.benq.com/esupport/PUBLIC%20DISPLAY%20PRODUCT/Control%20Protocols/RP6503/RS232&LAN%20Command%20List_v20231114_Others.pdf"
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T11:59:49.267Z
last_checked_at: 2026-07-21T21:36:48.959Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:36:48.959Z
matched_actions: 77
action_count: 77
confidence: medium
summary: "All 77 spec actions matched literally in source; full command coverage (77/77) with no drift; transport parameters (port 8000, 8-bit data, no parity, 1 stop bit) verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model number exact resolution (xxxxxK placeholder in source); UNRESOLVED: HDBaseT control protocol details beyond COM port mention; UNRESOLVED: 3D Sync nVIDIA and 2D to 3D not supported per source; UNRESOLVED: source document covers MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534 projectors — command applicability to RPxxxxK panels inferred from shared BenQ RS232 dialect"
- "configurable 9600/14400/19200/38400/57600/115200 bps; no single default stated"
- "no unsolicited event notifications documented"
- "no multi-step macro sequences documented"
- "standby network/microphone settings not supported on source-listed models (per source); UNRESOLVED: Lamp2 hour not supported (per source); UNRESOLVED: LampSaver mode not supported (per source); UNRESOLVED: projection log in code not supported (per source); UNRESOLVED: broadcasting not supported (per source); UNRESOLVED: AMX device discovery not supported (per source); UNRESOLVED: MAC address query not supported (per source); UNRESOLVED: remote receiver not supported (per source); UNRESOLVED: microphone volume not supported (per source); UNRESOLVED: source document model mismatch — guide covers MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534, not RPxxxxK directly; UNRESOLVED: exact RPxxxxK model resolution and firmware version not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
