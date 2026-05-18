---
spec_id: admin/idk-fdx-s
schema_version: ai4av-public-spec-v1
revision: 1
title: "IDK Corporation FDX-S Control Spec"
manufacturer: IDK
model_family: FDX-S08U
aliases: []
compatible_with:
  manufacturers:
    - IDK
    - "IDK Corporation"
  models:
    - FDX-S08U
    - FDX-S16U
    - FDX-S32U
    - FDX-S64U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - idkav.com
  - manualslib.com
source_urls:
  - https://www.idkav.com/content/documents/manuals/fdx-s_cm_ver.4.10.0_en.pdf
  - https://www.manualslib.com/manual/1871261/Idk-Fdx-S-Series.html
retrieved_at: 2026-04-29T23:58:51.825Z
last_checked_at: 2026-05-14T18:17:16.796Z
generated_at: 2026-05-14T18:17:16.796Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.796Z
  matched_actions: 37
  action_count: 37
  confidence: high
  summary: "All 50 spec actions matched source commands; all transport values verified in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# IDK Corporation FDX-S Control Spec

## Summary
IDK FDX-S is a modular matrix switcher supporting 8 to 64 I/O channels depending on model. Control via RS-232C (up to 38.4 kbps) or LAN (TCP ports 1100/6000-6999, HTTP port 80). No login authentication required. Command format: `@` prefix + 3-letter command + comma-separated parameters, terminated with CR+LF.

<!-- UNRESOLVED: detailed signal format specifications for 4K@60 boards beyond EDID values; multi-window memory structure not documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
  - http
serial:
  baud_rate: 4800  # 4800/9600/14400/19200/38400 bps - source states range
  data_bits: 8  # 7/8 bit - source states range, default 8
  parity: none  # NONE/EVEN/ODD - source states range, default NONE
  stop_bits: 1  # 1/2 - source states range, default 1
  flow_control: none
  delimiter: "CR+LF (0x0D 0x0A)"
addressing:
  port: 1100  # TCP command port; range 6000-6999 also valid
  http_port: 80  # WEB browser control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON command in transmission mode examples
- routable  # inferred: I/O channel switching commands present (@GSW/@SSW)
- queryable  # inferred: status query commands present (@GIS, @GOS, @GIV, @GHC, @GAA)
- levelable  # inferred: brightness/contrast/hue/saturation/gamma commands present
```

## Actions
```yaml
- id: io_channel_switch
  label: I/O Channel Switching
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (0=OFF, 1 to n=IN1 to INn)
    - name: out_ch
      type: integer
      description: Output channel (0=All, 1 to n=OUT1 to OUTn)

- id: straight_channel_switch
  label: Straight Channel Switching
  kind: action
  params: []

- id: input_channel_selection_copy
  label: Input Channel Selection Copy
  kind: action
  params:
    - name: sch
      type: integer
      description: Source output channel (1 to n=OUT1 to OUTn)
    - name: dch
      type: integer
      description: Destination output channel (0=All outputs, 1 to n=OUT1 to OUTn)

- id: output_resolution
  label: Output Resolution
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: auto
      type: integer
      description: "0=Manual resolution, 1=Auto"
    - name: resolution
      type: integer
      description: "1=VGA, 3=XGA, 7=SXGA, 15=VESAHD(1920x1080), 16=WUXGA(1920x1200), 18=WQHD, 50-57=2160p, 60-67=4096x2160"

- id: output_brightness
  label: Output Brightness
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: brightness
      type: integer
      description: "0-200 (default 100)"

- id: output_contrast
  label: Output Contrast
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: red
      type: integer
      description: Red contrast 0-200 (default 100)
    - name: green
      type: integer
      description: Green contrast 0-200 (default 100)
    - name: blue
      type: integer
      description: Blue contrast 0-200 (default 100)

- id: output_gamma
  label: Output Gamma
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: gamma
      type: integer
      description: "1-30 = 0.1 to 3.0 (default 10 = 1.0)"

- id: input_brightness
  label: Input Brightness
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: brightness
      type: integer
      description: "0-200 (default 100)"

- id: input_contrast
  label: Input Contrast
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: red
      type: integer
      description: Red contrast 0-200 (default 100)
    - name: green
      type: integer
      description: Green contrast 0-200 (default 100)
    - name: blue
      type: integer
      description: Blue contrast 0-200 (default 100)

- id: input_hue
  label: Input Hue
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: hue
      type: integer
      description: "0-359 degrees (default 0)"

- id: input_saturation
  label: Input Saturation
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: saturation
      type: integer
      description: "0-200 (default 100)"

- id: input_sharpness
  label: Input Sharpness
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: sharp
      type: integer
      description: "-5 to 15 (default 0)"

- id: mute
  label: Audio Mute
  kind: action
  params:
    - name: out_ch
      type: integer
      description: "Output channel: 0=All, 1 to n=OUT1 to OUTn, 300=All analog, 301-312=ANALOG OUT1-12, 500=All Dante, 501-532=DANTE OUT1-32"
    - name: mode
      type: integer
      description: "0=Not outputting, 1=Outputting"

- id: output_lip_sync
  label: Output Lip Sync
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel
    - name: time
      type: integer
      description: "Lip sync delay 0-256 ms (default 0)"

- id: audio_embedding_deembedding
  label: Audio Embedding/De-embedding
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel
    - name: select
      type: integer
      description: "Audio selection: 0=Video input channel audio, 301-304=ANALOG IN1-4, 501-532=DANTE IN1-32"

- id: hdcp_output
  label: HDCP Output
  kind: action
  params:
    - name: out_ch
      type: integer
      description: "Output channel (0=All, 1 to n=OUT1 to OUTn)"
    - name: hdcp
      type: integer
      description: "0=HDCP2.2 priority, 1=HDCP1.4 encrypted, 2=Encrypted only if input has HDCP, 3=Not encrypted"

- id: edid_resolution
  label: EDID Resolution
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: edid
      type: integer
      description: "0=External, 1-4=Copied EDID, 5=1080p, 6=720p, 9=XGA, 14=SXGA, 40-45=4K resolutions"

- id: rs232c_config
  label: RS-232C Configuration
  kind: action
  params:
    - name: baudrate
      type: integer
      description: "0=4800, 1=9600, 2=14400, 3=19200, 4=38400 bps"
    - name: length
      type: integer
      description: "0=7 bit, 1=8 bit"
    - name: parity
      type: integer
      description: "0=NONE, 1=ODD, 2=EVEN"
    - name: stop
      type: integer
      description: "0=1 bit, 1=2 bit"

- id: ip_address_set
  label: Set IP Address
  kind: action
  params:
    - name: unit_1
      type: integer
      description: First octet (0-255)
    - name: unit_2
      type: integer
      description: Second octet (0-255)
    - name: unit_3
      type: integer
      description: Third octet (0-255)
    - name: unit_4
      type: integer
      description: Fourth octet (0-255)

- id: subnet_mask_set
  label: Set Subnet Mask
  kind: action
  params:
    - name: unit_1
      type: integer
      description: First octet (0-255)
    - name: unit_2
      type: integer
      description: Second octet (0-255)
    - name: unit_3
      type: integer
      description: Third octet (0-255)
    - name: unit_4
      type: integer
      description: Fourth octet (0-255)

- id: gateway_address_set
  label: Set Gateway Address
  kind: action
  params:
    - name: unit_1
      type: integer
      description: First octet (0-255)
    - name: unit_2
      type: integer
      description: Second octet (0-255)
    - name: unit_3
      type: integer
      description: Third octet (0-255)
    - name: unit_4
      type: integer
      description: Fourth octet (0-255)

- id: tcp_port_set
  label: Set TCP Port Number
  kind: action
  params:
    - name: port
      type: integer
      description: "TCP port: 1100, 6000-6999"
    - name: connection
      type: integer
      description: "1=Fixed (8-connection setting)"

- id: auto_disconnect_set
  label: Set Automatic Disconnection Time
  kind: action
  params:
    - name: service
      type: integer
      description: "1 (fixed)"
    - name: time
      type: integer
      description: "0=Not disconnect, 1-180 seconds (default 30)"

- id: preset_recall
  label: Recall Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1-32"

- id: preset_save
  label: Save Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1-32"
    - name: name
      type: string
      description: "Memory name (up to 10 ASCII chars 0x20-0x7D)"

- id: reboot
  label: Reboot
  kind: action
  params: []

- id: initialization
  label: Initialize
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=All settings, 1=Excluding communication settings"

- id: front_panel_lock
  label: Front Panel Security Lockout
  kind: action
  params:
    - name: lock
      type: integer
      description: "0=Unlock, 1=Lock, 2=Change current setting"

- id: unsolicited_notification_ip_set
  label: Set Unsolicited Notification IP/UDP Port
  kind: action
  params:
    - name: unit_1
      type: integer
      description: First octet of IP (0-255)
    - name: unit_2
      type: integer
      description: Second octet (0-255)
    - name: unit_3
      type: integer
      description: Third octet (0-255)
    - name: unit_4
      type: integer
      description: Fourth octet (0-255)
    - name: port
      type: integer
      description: "UDP port 1-65535 (default 1147)"

- id: unsolicited_notification_udp_interval_set
  label: Set UDP Unsolicited Notification Interval
  kind: action
  params:
    - name: time
      type: integer
      description: "0=OFF, 1-50=100ms-5000ms in 100ms steps"
    - name: save
      type: integer
      description: "0=Not saved, 1=Save setting"

- id: unsolicited_notification_tcp_interval_set
  label: Set TCP/RS-232C Unsolicited Notification Interval
  kind: action
  params:
    - name: time
      type: integer
      description: "0=OFF, 1-50=100ms-5000ms in 100ms steps"

- id: rs232c_transmission_mode
  label: RS-232C Transmission Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=RS-232C mode"

- id: lan_transmission_mode
  label: LAN Transmission Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=LAN mode"

- id: rs232c_transmission_sending_channel
  label: RS-232C Transmission Sending Channel
  kind: action
  params:
    - name: ch
      type: integer
      description: "1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"

- id: rs232c_transmission_receiving_channel
  label: RS-232C Transmission Receiving Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"

- id: lan_transmission_sending_channel
  label: LAN Transmission Sending Channel
  kind: action
  params:
    - name: ch
      type: integer
      description: "1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"

- id: lan_transmission_receiving_channel
  label: LAN Transmission Receiving Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: enum
  values:
    - "1: Erroneous parameter format or value"
    - "2: Undefined command or wrong format"
    - "3: Currently cannot be used"
    - "4: Loading EDID failed"
  response: "@ERR,error<CR><LF>"

- id: input_signal_status
  label: Input Signal Status (For Each Channel)
  type: object
  fields:
    - name: mode
      type: integer
      description: "0=All, 1=Mode/color depth, 2=Resolution/freq, 3=Color space, 4=Audio, 5=HDCP"
  response: "@GIS,in,mode,status_1,...,status_5<CR><LF>"

- id: output_signal_status
  label: Output Signal Status (For Each Channel)
  type: object
  fields:
    - name: mode
      type: integer
      description: "0=All, 1=HDCP, 2=HDCP authentication"
  response: "@GOS,out,mode,status_1(,status_2)<CR><LF>"

- id: system_status
  label: System Status
  type: object
  response: "@GHC,voltage,rpm,temp,in,out,audio<CR><LF>"
  fields:
    - name: voltage
      type: integer
      description: "0=Normal, 1=Abnormal power supply"
    - name: rpm
      type: integer
      description: "0=Normal, 1=Abnormal fan"
    - name: temp
      type: integer
      description: "0=Normal, 1=Abnormal temperature"
    - name: in
      type: integer
      description: "0=Normal, 1=Abnormal input board comm"
    - name: out
      type: integer
      description: "0=Normal, 1=Abnormal output board comm"
    - name: audio
      type: integer
      description: "0=Normal, 1=Abnormal audio board"

- id: version
  label: Version
  type: object
  response: "@GIV,id,version,input,output<CR><LF>"
  fields:
    - name: id
      type: string
      description: Model number (e.g. FDX-S16U)
    - name: version
      type: string
      description: Firmware version
    - name: input
      type: integer
      description: Number of inputs
    - name: output
      type: integer
      description: Number of outputs

- id: board_status
  label: Board Status
  type: object
  response: "@GBS,board,slot,temp,status<CR><LF>"

- id: board_mounting_status
  label: Board Mounting Status
  type: object
  response: "@GSS,board,slot_1,...,slot_m<CR><LF>"

- id: fan_status
  label: Fan Status
  type: object
  response: "@GFS,rpm_1,s_1,rpm_2,s_2,...<CR><LF>"

- id: power_supply_voltage_status
  label: Power Supply Voltage Status
  type: object
  response: "@GPS,status1(,status2)(,status3)(,status4)<CR><LF>"

- id: alarm_status
  label: Alarm Status
  type: object
  response: "@GAA,model,version,count,power,input_1..n,output_1..n,fan_1..m<CR><LF>"

- id: unsolicited_status_notification
  label: Unsolicited Status Notification
  type: object
  response: "@PSH,in,out,system<CR><LF>"
  description: "Bitmask of changed input/output channels; in/out are hex values where bit 0=IN1/OUT1"
```

## Variables
```yaml
# UNRESOLVED: comprehensive variable enumeration - source documents individual get/set pairs
# but does not provide a dedicated Variables section
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited notifications via UDP/TCP/RS-232C when status changes
# Enable via @SUH (UDP) or @SPH (TCP/RS-232C)
# Notification format: @PSH response or @AIN/@AOT responses
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not explicitly documented as macros
# Source shows transmission mode sequences (RS-232C over LAN/HDBaseT) but no named macro format
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: @CLR initialization causes device reboot
```

## Notes
Channel counts by model: FDX-S08U (8ch/2 boards), FDX-S16U (16ch/4 boards), FDX-S32U (32ch/8 boards), FDX-S64U (64ch/16 boards). Command format uses `@` prefix (0x40) + 3 alphabetical chars + parameters. All commands terminated with CR+LF (0x0D 0x0A). Error responses: `@ERR,1` through `@ERR,4`. Up to 8 simultaneous TCP connections supported. Auto-disconnect timeout: 1-180 sec (default 30 sec). For HDBaseT/SDVoE boards only: RS-232C and LAN transmission modes allow passing serial data through to external devices.

<!-- UNRESOLVED: UDP notification port default (1147) stated but source does not confirm if configurable -->

## Provenance

```yaml
source_domains:
  - idkav.com
  - manualslib.com
source_urls:
  - https://www.idkav.com/content/documents/manuals/fdx-s_cm_ver.4.10.0_en.pdf
  - https://www.manualslib.com/manual/1871261/Idk-Fdx-S-Series.html
retrieved_at: 2026-04-29T23:58:51.825Z
last_checked_at: 2026-05-14T18:17:16.796Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.796Z
matched_actions: 37
action_count: 37
confidence: high
summary: "All 50 spec actions matched source commands; all transport values verified in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
