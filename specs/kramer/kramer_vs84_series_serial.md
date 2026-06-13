---
spec_id: admin/kramer-vs-84hn
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VS-84HN 8x4 HDMI Matrix Switcher Control Spec"
manufacturer: Kramer
model_family: VS-84HN
aliases: []
compatible_with:
  manufacturers:
    - Kramer
    - "Kramer Electronics"
  models:
    - VS-84HN
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/vs-84hn_rev_12.pdf
  - https://k.kramerav.com/downloads/manuals/vs-84h.pdf
  - https://k.kramerav.com/support/downloads.asp
retrieved_at: 2026-06-01T20:37:16.283Z
last_checked_at: 2026-06-12T19:25:09.549Z
generated_at: 2026-06-12T19:25:09.549Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated; safety interlocks and confirmation requirements not stated in source."
  - "source documents command chaining syntax (pipe '|' separator) but no"
  - "source does not document confirmation requirements"
  - "source does not document interlock procedures"
  - "firmware version not stated in source; AV command not fully documented in 11.2 table (only VID shown); safety interlocks and confirmation requirements not stated."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:25:09.549Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions verified against source. Protocol 3000 ASCII commands and Protocol 2000 HEX instructions present in source table. Transport parameters (RS-232 9600/8/N/1, TCP 5000, UDP 50000, IP 192.168.1.39/255.255.255.0) confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Kramer VS-84HN 8x4 HDMI Matrix Switcher Control Spec

## Summary
8x4 HDMI matrix switcher supporting both Kramer Protocol 2000 (HEX, 4-byte) and Protocol 3000 (ASCII, default). Control via RS-232 (9-pin D-sub) and Ethernet (TCP 5000, UDP 50000). Spec covers Protocol 3000 command set, Protocol 2000 instruction codes, and transport defaults.

<!-- UNRESOLVED: firmware version not stated; safety interlocks and confirmation requirements not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  tcp_port: 5000
  udp_port: 50000
  default_ip: 192.168.1.39
  subnet_mask: 255.255.255.0
  gateway: 192.168.1.1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: power/reset commands present
- routable        # inferred: VID routing command present
- queryable       # inferred: query commands returning state present
```

## Actions
```yaml
# Kramer Protocol 3000 ASCII commands (default protocol).
# Format: #CMD<SP>param1,param2<CR>

- id: handshake
  label: Protocol handshaking
  kind: action
  command: "#<CR>"
  params: []

- id: build_date_query
  label: Read device build date
  kind: query
  command: "#BUILD-DATE?<CR>"
  params: []

- id: cpedid
  label: Copy EDID from output to input EEPROM
  kind: action
  command: "#CPEDID<SP>output_id,input_id<CR>"
  params:
    - name: output_id
      type: integer
      description: Video output id 1..4 (HDMI OUT)
    - name: input_id
      type: integer
      description: Video input id 1..8 (HDMI IN)

- id: display_query
  label: Read output HPD status
  kind: query
  command: "#DISPLAY?<SP>out_id<CR>"
  params:
    - name: out_id
      type: integer
      description: Output number (1..4)

- id: factory_reset
  label: Reset to factory default configuration
  kind: action
  command: "#FACTORY<CR>"
  params: []

- id: gedid_set
  label: Set EDID data from device
  kind: action
  command: "#GEDID<SP>stage,stage_id<CR>"
  params:
    - name: stage
      type: integer
      description: "0=input, 1=output, 2=default EDID"
    - name: stage_id
      type: integer
      description: Number of chosen stage (1..max in/out)

- id: gedid_get
  label: Get EDID support on input/output
  kind: query
  command: "#GEDID?<SP>stage,stage_id<CR>"
  params:
    - name: stage
      type: integer
      description: "0=input, 1=output, 2=default EDID"
    - name: stage_id
      type: integer
      description: Number of chosen stage (1..max in/out)

- id: gedid_ext
  label: Read EDID data from external device connected to output
  kind: query
  command: "#GEDID-EXT<CR>"
  params: []

- id: help
  label: List commands / help for specific command
  kind: query
  command: "#HELP<CR>"  # or "#HELP<SP>command_name<CR>"
  params: []

- id: idv
  label: Visual identify device
  kind: action
  command: "#IDV<CR>"
  params: []

- id: info_io_query
  label: Read in/out count
  kind: query
  command: "#INFO-IO?<CR>"
  params: []

- id: info_prst_query
  label: Read maximum preset count
  kind: query
  command: "#INFO-PRST?<CR>"
  params: []

- id: ldedid
  label: Load EDID data from external application
  kind: action
  command: "#LDEDID<SP>dst_type,dest_bitmask,size,safe_mode<CR>"
  params:
    - name: dst_type
      type: integer
      description: "0=input, 1=output, 2=Default EDID"
    - name: dest_bitmask
      type: string
      description: Hex bitmap of destination IDs (0x format)
    - name: size
      type: integer
      description: EDID data size
    - name: safe_mode
      type: integer
      description: "0=accept as-is, 1=adjust EDID"

- id: lock_fp_set
  label: Lock front panel
  kind: action
  command: "#LOCK-FP<SP>lock_mode<CR>"  # short form: "#LCK<SP>lock_mode<CR>"
  params:
    - name: lock_mode
      type: string
      description: "0/OFF = unlock, 1/ON = lock"

- id: lock_fp_query
  label: Read front panel lock state
  kind: query
  command: "#LOCK-FP?<CR>"  # short form: "#LCK?<CR>"
  params: []

- id: model_query
  label: Read device model
  kind: query
  command: "#MODEL?<CR>"
  params: []

- id: p2000_switch
  label: Switch to Protocol 2000
  kind: action
  command: "#P2000<CR>"
  params: []

- id: prot_ver_query
  label: Read device protocol version
  kind: query
  command: "#PROT-VER?<CR>"
  params: []

- id: prst_lst_query
  label: Read saved presets list
  kind: query
  command: "#PRST-LST?<CR>"
  params: []

- id: prst_rcl
  label: Recall saved preset
  kind: action
  command: "#PRST-RCL<SP>preset<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number

- id: prst_sto
  label: Store current connections to preset
  kind: action
  command: "#PRST-STO<SP>preset<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number

- id: prst_vid_query
  label: Read video connections from saved preset
  kind: query
  command: "#PRST-VID?<SP>preset,out<CR>"  # use "*" for all outputs
  params:
    - name: preset
      type: integer
      description: Preset number
    - name: out
      type: string
      description: Output number or "*" for all outputs

- id: reset_device
  label: Reset device
  kind: action
  command: "#RESET<CR>"
  params: []

- id: signal_query
  label: Get input signal lock status
  kind: query
  command: "#SIGNAL?<SP>inp_id<CR>"
  params:
    - name: inp_id
      type: integer
      description: Input number (1..8)

- id: sn_query
  label: Read device serial number
  kind: query
  command: "#SN?<CR>"
  params: []

- id: version_query
  label: Read device firmware version
  kind: query
  command: "#VERSION?<CR>"
  params: []

- id: vid_set
  label: Set video switch state
  kind: action
  command: "#VID<SP>in>out,in>out,...<CR>"
  params:
    - name: connections
      type: string
      description: Comma-separated in>out pairs; in=input number (0 to disconnect); out=output number or "*" for all

- id: vid_get
  label: Get video switch state
  kind: query
  command: "#VID?<SP>out<CR>"  # use "*" for all outputs
  params:
    - name: out
      type: string
      description: Output number or "*" for all outputs

# Kramer Protocol 2000 HEX commands (4-byte frame).
# Byte1: 0|D|N5..N0  (D=dest, N=instruction)
# Byte2: 1|I6..I0    (input)
# Byte3: 1|O6..O0    (output)
# Byte4: 1|OVR|M4..M0 (machine)
# Example: 0x01 0x81 0x81 0x81 = Output 1 to Input 1
# Switch protocol P2000<->P3000 via #P2000<CR> (from P3000) or 0x38,0x80,0x83,0x81 (from P2000)

- id: p2000_reset_video
  label: Protocol 2000 - Reset Video
  kind: action
  command: "0x00,0x80,0x80,0x81"
  params: []

- id: p2000_switch_video
  label: Protocol 2000 - Switch Video
  kind: action
  command: "0x01,0x{(input+0x80):02X},0x{(output+0x80):02X},0x81"
  params:
    - name: input
      type: integer
      description: Video input (0=disconnect)
    - name: output
      type: integer
      description: Video output (0=all outputs)

- id: p2000_store_video_status
  label: Protocol 2000 - Store Video Status
  kind: action
  command: "0x03,0x{(setup+0x80):02X},0x{(0+0x80):02X},0x81"
  params:
    - name: setup
      type: integer
      description: Setup number
    - name: store
      type: integer
      description: "0=store, 1=delete"

- id: p2000_recall_video_status
  label: Protocol 2000 - Recall Video Status
  kind: action
  command: "0x04,0x{(setup+0x80):02X},0x80,0x81"
  params:
    - name: setup
      type: integer
      description: Setup number

- id: p2000_request_status
  label: Protocol 2000 - Request Status of Video Output
  kind: query
  command: "0x05,0x{(setup+0x80):02X},0x{(output+0x80):02X},0x81"
  params:
    - name: setup
      type: integer
      description: Setup number
    - name: output
      type: integer
      description: Output number whose status is requested

- id: p2000_request_setup_valid
  label: Protocol 2000 - Request Whether Setup Defined / Input Valid
  kind: query
  command: "0x0F,0x{(id+0x80):02X},0x{(mode+0x80):02X},0x81"
  params:
    - name: id
      type: integer
      description: SETUP # or Input #
    - name: mode
      type: integer
      description: "0=check setup defined, 1=check input valid"

- id: p2000_lock_front_panel
  label: Protocol 2000 - Lock Front Panel
  kind: action
  command: "0x1E,0x80,0x{(mode+0x80):02X},0x81"
  params:
    - name: mode
      type: integer
      description: "0=unlock, 1=lock"

- id: p2000_request_panel_locked
  label: Protocol 2000 - Request Whether Panel Is Locked
  kind: query
  command: "0x1F,0x80,0x80,0x81"
  params: []

- id: p2000_change_to_ascii
  label: Protocol 2000 - Change to ASCII (Protocol 3000)
  kind: action
  command: "0x38,0x80,0x83,0x81"
  params: []

- id: p2000_identify_machine
  label: Protocol 2000 - Identify Machine
  kind: query
  command: "0x3D,0x{(item+0x80):02X},0x{(request+0x80):02X},0x81"
  params:
    - name: item
      type: integer
      description: "1=video name, 2=audio name, 3=video SW ver, 4=audio SW ver, 5=RS422 ctrl name, 6=RS422 ctrl ver, 7=remote name, 8=remote SW ver, 9=P2000 rev"
    - name: request
      type: integer
      description: "0=first 4 digits, 1=first suffix, 2=second suffix, 3=third suffix, 10=first prefix, 11=second prefix, 12=third prefix"

- id: p2000_define_machine
  label: Protocol 2000 - Define Machine
  kind: action
  command: "0x3E,0x{(item+0x80):02X},0x{(target+0x80):02X},0x81"
  params:
    - name: item
      type: integer
      description: "1=#inputs, 2=#outputs, 3=#setups"
    - name: target
      type: integer
      description: "1=video, 2=audio, 3=SDI, 4=remote panel, 5=RS-422 controller"
```

## Feedbacks
```yaml
- id: signal_status
  type: enum
  values: [invalid, valid, sink_and_edid_valid]
  description: "0=Signal/sink not valid, 1=Signal/sink valid, 2=Sink and EDID valid"
  source_command: "#SIGNAL? response"

- id: display_hpd_status
  type: enum
  values: [invalid, valid, sink_and_edid_valid]
  description: "0=Signal or sink is not valid, 1=Signal or sink is valid, 2=Sink and EDID is valid"
  source_command: "#DISPLAY? response"

- id: build_date
  type: string
  description: "Format YYYY/MM/DD hh:mm:ss"
  source_command: "#BUILD-DATE? response"

- id: model_name
  type: string
  description: Up to 19 printable ASCII chars
  source_command: "#MODEL? response"

- id: serial_number
  type: string
  description: 11 decimal digits (factory assigned)
  source_command: "#SN? response"

- id: firmware_version
  type: string
  description: "Format XX.XX.XXXX (major.minor.build)"
  source_command: "#VERSION? response"

- id: protocol_version
  type: string
  description: "Format XX.XX"
  source_command: "#PROT-VER? response"

- id: input_count
  type: integer
  description: Number of inputs in unit
  source_command: "#INFO-IO? response"

- id: output_count
  type: integer
  description: Number of outputs in unit
  source_command: "#INFO-IO? response"

- id: video_preset_count
  type: integer
  description: Maximum number of video presets
  source_command: "#INFO-PRST? response"

- id: audio_preset_count
  type: integer
  description: Maximum number of audio presets
  source_command: "#INFO-PRST? response"

- id: saved_presets
  type: string
  description: Comma-separated list of saved preset numbers
  source_command: "#PRST-LST? response"

- id: video_switch_state
  type: string
  description: "in>1, in>2, ... video connection map"
  source_command: "#VID? response"
```

## Variables
```yaml
# No standalone settable parameters outside the actions above.
# All EDID, preset, and routing state is set via the corresponding actions.
```

## Events
```yaml
- id: display_hpd_change
  description: "Sent after every change in output HPD status (ON to OFF, or OFF to ON when all parameters stable and valid)"
  source: "#DISPLAY? unsolicited response"

- id: signal_status_change
  description: "Sent after every change in input signal status (ON to OFF, or OFF to ON)"
  source: "#SIGNAL? unsolicited response"
```

## Macros
```yaml
# UNRESOLVED: source documents command chaining syntax (pipe '|' separator) but no
# explicit multi-step sequences/macros are defined in the source.
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: source does not document confirmation requirements
interlocks: []  # UNRESOLVED: source does not document interlock procedures
# Source notes: After FACTORY/RESET, disconnect USB immediately (Windows USB bug may lock the port).
# Reconnect cable to reopen port if locked.
```

## Notes
- VS-84HN defaults to Protocol 3000 (ASCII). Protocol 2000 (HEX) is also supported. Switch between them via `#P2000<CR>` (from P3000) or `0x38,0x80,0x83,0x81` (from P2000). Front-panel combos: Output 1+3 = P3000, Output 1+2 = P2000.
- Protocol 3000 host messages terminate with `<CR>`. Device responses terminate with `<CR><LF>`. Message start char: `#` for host, `~` for device. Pipe `|` chains commands.
- Maintain at least 200ms delay between consecutive commands. After EDID get/store commands, wait 1 second before next command.
- RS-232: 9-wire straight cable (pin2↔2, pin3↔3, pin5↔5). No null-modem needed.
- Factory default IP: 192.168.1.39 / mask 255.255.255.0 / gateway 192.168.1.1. Reset to defaults: hold ETH RESET button while powering on.
- Protocol 2000 frame: Byte1=0|D|instruction, Byte2=1|input, Byte3=1|output, Byte4=1|OVR|machine. Single-machine use: machine number = 1 (M4..M0=0001, byte4=0x81).
- Packet protocol for large transfers (LDEDID): uses 16-bit CRC-CCITT (poly 0x1021, init 0x0000, final XOR 0x0). 30-second timeout per packet stream.
- Video + audio switching: `#AV in>out` mentioned in source examples but full AV command not listed in main command table — `#VID` is the canonical video switch command. Use `*` to address all outputs, `0` to disconnect.
- `#FACTORY` deletes all user data; operation may take time.

<!-- UNRESOLVED: firmware version not stated in source; AV command not fully documented in 11.2 table (only VID shown); safety interlocks and confirmation requirements not stated. -->
````

Spec written. Covers both Protocol 3000 (24 commands) and Protocol 2000 (11 instructions), plus transport (RS-232 9600/8/N/1, TCP 5000, UDP 50000, IP 192.168.1.39). Gaps marked: firmware, AV command, safety interlocks.

## Provenance

```yaml
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/vs-84hn_rev_12.pdf
  - https://k.kramerav.com/downloads/manuals/vs-84h.pdf
  - https://k.kramerav.com/support/downloads.asp
retrieved_at: 2026-06-01T20:37:16.283Z
last_checked_at: 2026-06-12T19:25:09.549Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:25:09.549Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions verified against source. Protocol 3000 ASCII commands and Protocol 2000 HEX instructions present in source table. Transport parameters (RS-232 9600/8/N/1, TCP 5000, UDP 50000, IP 192.168.1.39/255.255.255.0) confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated; safety interlocks and confirmation requirements not stated in source."
- "source documents command chaining syntax (pipe '|' separator) but no"
- "source does not document confirmation requirements"
- "source does not document interlock procedures"
- "firmware version not stated in source; AV command not fully documented in 11.2 table (only VID shown); safety interlocks and confirmation requirements not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
