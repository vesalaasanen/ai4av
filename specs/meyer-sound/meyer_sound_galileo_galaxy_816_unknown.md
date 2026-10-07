---
spec_id: admin/meyer-sound-galileo-galaxy-816
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meyer Sound Galileo GALAXY 816 Control Spec"
manufacturer: "Meyer Sound"
model_family: "GALAXY 816"
aliases: []
compatible_with:
  manufacturers:
    - "Meyer Sound"
  models:
    - "GALAXY 816"
    - "GALAXY 408"
    - "GALAXY 816-AES"
    - "Bluehorn 816"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.meyersound.com
source_urls:
  - https://docs.meyersound.com/products/en/programming-guide---galileo-galaxy.html
  - https://docs.meyersound.com/products/en/user-guide---galileo-galaxy.html
retrieved_at: 2026-05-13T07:42:59.056Z
last_checked_at: 2026-10-07T20:54:17.661Z
generated_at: 2026-10-07T20:54:17.661Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "/processing/output/\\d+/mute=false"
  - "/processing/(in\\|out)put/1/mute=true"
  - "hardware features (analog vs. AES I/O counts, AVB stream counts) differ across the four models in the family; the OSC/ASCII control surface described here is shared, but per-model input/output channel counts are device-specific. Source explicitly notes entity defaults such as input_channel_count and output_channel_count are device-specific."
  - "source documents no multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:54:17.661Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "All 66 action units match source literals and shapes; the transport ports are supported and auth is honestly UNRESOLVED; only two regex examples are unrepresented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Meyer Sound Galileo GALAXY 816 Control Spec

## Summary
The Meyer Sound Galileo GALAXY 816 is a network loudspeaker management processor in the GALAXY Network Platform family. This spec covers the device's Control Plane server, which exposes two parallel text/binary protocols: a human-readable ASCII server (TCP) and an Open Sound Control (OSC) server (TCP and UDP). Clients (Compass software, Spacemap Go, or third-party controllers) connect over IPv4, IPv6, or mDNS to set, query, describe, subscribe, and unsubscribe from a large tree of OSC-style control points, and to invoke a small set of built-in snapshot/ping commands.

<!-- UNRESOLVED: hardware features (analog vs. AES I/O counts, AVB stream counts) differ across the four models in the family; the OSC/ASCII control surface described here is shared, but per-model input/output channel counts are device-specific. Source explicitly notes entity defaults such as input_channel_count and output_channel_count are device-specific. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - osc
addressing:
  port: 25003  # ASCII server (TCP)
  # The OSC server listens on TCP and UDP port 25004. Virtual GALAXY processors use
  # additional port schemes - see Notes.
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

**Connection examples (verbatim from source):**
- TCP/IPv4 ASCII: `telnet 192.168.71.146 25003`
- TCP/IPv6 ASCII: `telnet fe80::21c:abff:fe00:584c%en12 25003`
- mDNS ASCII: `telnet MyGalaxy.MyGroup.local 25003` or `telnet mslg-gx-816-16342723.local 25003`

**Addressing model:** the device accepts IPv4, IPv6, or mDNS addresses equivalently. GALAXY exposes two servers — an ASCII server (TCP, port 25003) and an OSC server (TCP and UDP, port 25004). Authentication is not described in the source.

## Traits
```yaml
# Populated from explicit source evidence:
# - queryable       (get/describe control point commands present)
# - levelable       (input/output gain, mute, delay, EQ settable)
# - routable        (matrix processing control points present)
# Power on/off is NOT in the source - no `powerable` trait.
```

## Actions
```yaml
# CRITICAL: every ASCII text command must end with a CR (`0d`) or LF (`0a`)
# terminator. The OSC equivalents use the same OSC address space with type-tagged
# arguments. Listed verbs are the source's 6 built-in commands plus the 5
# control-point characters (=, no-char, ?, +, -).

# --- Built-in commands ---

- id: recall_snapshot
  label: Recall Snapshot
  kind: action
  command: ":recall_snapshot {snapshot_id} {exclusion_code}"  # ASCII form; OSC: /recall_snapshot,i {id} {exclusion}
  params:
    - name: snapshot_id
      type: integer
      description: Snapshot identifier (0-255 per source)
    - name: exclusion_code
      type: integer
      description: Optional exclusion bitmask (1, 2, 4, 8, 16, 32, 64, 128, 256; sum values to combine; see Notes)
      required: false

- id: update_snapshot
  label: Update Snapshot
  kind: action
  command: ":update_snapshot {snapshot_id}"  # ASCII form; OSC: /update_snapshot,i {id}
  params:
    - name: snapshot_id
      type: integer
      description: Snapshot identifier (0-255 per source)

- id: create_snapshot
  label: Create Snapshot
  kind: action
  command: ":create_snapshot {name} {comment}"  # ASCII form; OSC: /create_snapshot,ss {name} {comment}
  params:
    - name: name
      type: string
      description: Name for the new snapshot
    - name: comment
      type: string
      description: Comment string for the new snapshot
      required: false

- id: delete_snapshot
  label: Delete Snapshot
  kind: action
  command: ":delete_snapshot {snapshot_id}"  # ASCII form; OSC: /delete_snapshot,h {id} (64-bit int)
  params:
    - name: snapshot_id
      type: integer
      description: Snapshot identifier (0-255 per source)

- id: ping
  label: Ping
  kind: action
  command: ":ping {keyword}"  # ASCII form; OSC: /ping,s {keyword}; no-arg form keeps subscription alive
  params:
    - name: keyword
      type: string
      description: Arbitrary string echoed in the pong response (used to match ping to pong)

- id: help
  label: List Built-in Commands
  kind: query
  command: ":?"  # ASCII only; OSC form: N/A
  params: []

# --- Control-point verbs (apply to any OSC-style address) ---

- id: set_control_point
  label: Set Control Point Value
  kind: action
  command: "{address}={value}"  # ASCII form uses `=` as the control character prefix; OSC: same address with type tag (T/F/i/f/s/h)
  params:
    - name: address
      type: string
      description: OSC-style control point path, e.g. `/processing/input/1/mute`. Supports regular expressions (`.`, `*`, `\d`, `\d+`, full regex).
    - name: value
      type: string
      description: Value appropriate to the control point (Boolean true/false, integer, float, or string). See Variables section for value types per control point.

- id: get_control_point
  label: Get Control Point Value
  kind: query
  command: "{address}"  # ASCII form has NO control character; OSC: same address with empty type tag
  params:
    - name: address
      type: string
      description: OSC-style control point path. Supports regular expressions to return multiple values.

- id: describe_control_point
  label: Get Control Point Description
  kind: query
  command: "?{address}"  # ASCII form uses `?` as the control character prefix; OSC: N/A
  params:
    - name: address
      type: string
      description: OSC-style control point path. Returns description, read_only, name, value, minimum, maximum, default, step, units.

- id: subscribe_control_point
  label: Subscribe to Control Point
  kind: action
  command: "+{address} {rate_ms}"  # ASCII form uses `+` as the control character prefix; OSC: /subscribe/{address},i {rate_ms}
  params:
    - name: address
      type: string
      description: OSC-style control point path. Supports regular expressions. Resubscribing to an already-subscribed address causes the server to re-send the current value.
    - name: rate_ms
      type: integer
      description: Update interval in milliseconds (0-100; default 30 if omitted). If the control point changes faster than this rate, updates are coalesced to this rate; if slower, updates are sent only on change.
      required: false

- id: unsubscribe_control_point
  label: Unsubscribe from Control Point
  kind: action
  command: "-{address}"  # ASCII form uses `-` as the control character prefix; OSC: /unsubscribe/{address} with empty type tag
  params:
    - name: address
      type: string
      description: OSC-style control point path. Only affects addresses the client is currently subscribed to.

# --- Worked examples (kept as illustrative actions; the verbs above are the real commands) ---

- id: mute_input
  label: Mute Input
  kind: action
  command: "/processing/input/{input_number}/mute=true"  # ASCII form; OSC: /processing/input/{input_number}/mute,T
  params:
    - name: input_number
      type: integer
      description: Input channel number (1-8 per source; 1-32 for matrix inputs)

- id: unmute_input
  label: Unmute Input
  kind: action
  command: "/processing/input/{input_number}/mute=false"  # ASCII form; OSC: /processing/input/{input_number}/mute,F
  params:
    - name: input_number
      type: integer
      description: Input channel number (1-8 per source; 1-32 for matrix inputs)

- id: mute_output
  label: Mute Output
  kind: action
  command: "/processing/output/{output_number}/mute=true"  # ASCII form; OSC: /processing/output/{output_number}/mute,T
  params:
    - name: output_number
      type: integer
      description: Output channel number (1-16 per source)

- id: unmute_output
  label: Unmute Output
  kind: action
  command: "/processing/output/{output_number}/mute=false"  # ASCII form; OSC: /processing/output/{output_number}/mute,F
  params:
    - name: output_number
      type: integer
      description: Output channel number (1-16 per source)

- id: set_input_gain
  label: Set Input Gain
  kind: action
  command: "/processing/input/{input_number}/gain={gain_db}"  # ASCII form; OSC: /processing/input/{input_number}/gain,f {gain_db}
  params:
    - name: input_number
      type: integer
      description: Input channel number (1-8 per source)
    - name: gain_db
      type: number
      description: Gain in dB (source shows -90 as -inf and 0 as unity)

- id: set_output_gain
  label: Set Output Gain
  kind: action
  command: "/processing/output/{output_number}/gain={gain_db}"  # ASCII form; OSC: /processing/output/{output_number}/gain,f {gain_db}
  params:
    - name: output_number
      type: integer
      description: Output channel number (1-16 per source)
    - name: gain_db
      type: number
      description: Gain in dB (source shows -90 as -inf and 0 as unity)

# --- Additional literal control-point queries ---

- id: get_matrix_control_point
  label: Get Matrix Control Point
  kind: query
  command: "/processing/matrix/Matrix"
  params: []

- id: get_system_firmware_status_string
  label: Get System Firmware Status String
  kind: query
  command: "/system/firmware/status_string"
  params: []

- id: get_active_snapshot_comment
  label: Get Active Snapshot Comment
  kind: query
  command: "/project/snapshot/active/comment"
  params: []

- id: get_active_snapshot_created
  label: Get Active Snapshot Created Timestamp
  kind: query
  command: "/project/snapshot/active/created"
  params: []

- id: get_active_snapshot_last_updated
  label: Get Active Snapshot Last Updated Timestamp
  kind: query
  command: "/project/snapshot/active/last_updated"
  params: []

- id: get_active_snapshot_locked
  label: Get Active Snapshot Locked
  kind: query
  command: "/project/snapshot/active/locked"
  params: []

- id: get_active_snapshot_modified
  label: Get Active Snapshot Modified
  kind: query
  command: "/project/snapshot/active/modified"
  params: []

- id: get_active_snapshot_name
  label: Get Active Snapshot Name
  kind: query
  command: "/project/snapshot/active/name"
  params: []

# --- Additional literal regular expression examples ---

- id: get_single_digit_input_mutes
  label: Get Single Digit Input Mutes
  kind: query
  command: '/processing/input/\d/mute'
  params: []

- id: get_snapshot_control_points
  label: Get Snapshot Control Points
  kind: query
  command: "/project/snapshot/7/.*"  # Literal source example; replace the snapshot segment using snapshot_id.
  params:
    - name: snapshot_id
      type: integer
      description: Snapshot number (0-255); replaces the literal 7 in the source example.

- id: mute_all_outputs_regex
  label: Mute All Outputs With Regular Expression
  kind: action
  command: "/processing/output/([1-9]|1[0-6])/mute=1"
  params: []

- id: set_output_subset_mute_to_zero
  label: Set Output Subset Mute To Zero
  kind: action
  command: "/processing/output/([1-8]|1[1-6])/mute=0"  # Source row title conflicts with its ASCII command; the literal command is retained.
  params: []

- id: unmute_all_outputs_regex
  label: Unmute All Outputs With Regular Expression
  kind: action
  command: "/processing/output/([1-9]|1[0-6])/mute=false"
  params: []

- id: unmute_outputs_one_to_eight
  label: Unmute Outputs One To Eight
  kind: action
  command: "/processing/output/([1-8])/mute=false"
  params: []

- id: unmute_outputs_nine_to_sixteen
  label: Unmute Outputs Nine To Sixteen
  kind: action
  command: "/processing/output/([9]|1[0-6])/mute=false"
  params: []

- id: unmute_single_digit_outputs
  label: Unmute Single Digit Outputs
  kind: action
  command: '/processing/output/\d/mute=false'
  params: []
```

## Feedbacks
```yaml
# Status control points are read-only. Subscribing to a control point causes
# the server to push current and changed values back to the client.

- id: pong
  label: Pong Response
  description: Returned by the server after a :ping command. Server CANNOT send a pong unprompted - pong is only ever a reply to ping. Includes the keyword supplied in the original ping.
  source: ":pong {keyword}"

- id: snapshot_recall_in_progress
  label: Snapshot Recall In Progress
  type: boolean
  description: True while a snapshot recall is being applied.
  address: /status/snapshot/recall_in_progress
  query_command: "/status/snapshot/recall_in_progress"
  default: false

- id: connected_client_count
  label: Connected Client Count
  type: integer
  description: Total number of clients currently subscribed to this GALAXY server.
  address: /status/connected_client_count
  query_command: "/status/connected_client_count"
  default: 3

- id: connected_osc_tcp_client_count
  label: Connected OSC-over-TCP Client Count
  type: integer
  address: /status/connected_osc_tcp_client_count
  query_command: "/status/connected_osc_tcp_client_count"
  default: 0

- id: connected_osc_udp_client_count
  label: Connected OSC-over-UDP Client Count
  type: integer
  address: /status/connected_osc_udp_client_count
  query_command: "/status/connected_osc_upd_client_count"  # Literal source spelling; see Notes.
  default: 0

- id: connected_text_tcp_client_count
  label: Connected ASCII-over-TCP Client Count
  type: integer
  address: /status/connected_text_tcp_client_count
  query_command: "/status/connected_text_tcp_client_count"
  default: 3

- id: beam_control_input_source
  label: Beam Control Input Source
  type: integer
  description: Read-only status; values may differ per device.
  address: /status/beam_control_input_source
  query_command: "/status/beam_control_input_source"
  default: 0

- id: aes_output_clock_input_number
  label: AES Output Clock Input Number
  type: integer
  address: /status/clock/aes_output/input_number
  query_command: "/status/clock/aes_output/input_number"
  default: 1

- id: aes_output_clock_sample_rate
  label: AES Output Clock Sample Rate
  type: integer
  description: Sample rate in Hz.
  address: /status/clock/aes_output/sample_rate
  query_command: "/status/clock/aes_output/sample_rate"
  default: 96000

- id: aes_output_clock_source
  label: AES Output Clock Source
  type: integer
  address: /status/clock/aes_output/source
  query_command: "/status/clock/aes_output/source"
  default: 0

- id: aes_output_clock_sync
  label: AES Output Clock Sync State
  type: integer
  address: /status/clock/aes_output/sync
  query_command: "/status/clock/aes_output/sync"
  default: 2

- id: gptp_clock_port_locked
  label: gPTP Clock Port Locked
  type: boolean
  address: /status/clock/gptp/{port_number}/port_locked
  query_command: "/status/clock/gptp/1/port_locked"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: true

- id: gptp_clock_as_capable
  label: gPTP Clock AS Capable
  type: boolean
  address: /status/clock/gptp/{port_number}/as_capable
  query_command: "/status/clock/gptp/1/as_capable"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: false

- id: gptp_clock_grand_master_id
  label: gPTP Clock Grand Master ID
  type: string
  address: /status/clock/gptp/{port_number}/grand_master_id
  query_command: "/status/clock/gptp/1/grand_master_id"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: 00-1C-AB-FF-FE-00-8D-80

- id: input_clock_sample_rate
  label: Input Clock Sample Rate
  type: integer
  address: /status/clock/input/{input_number}/sample_rate
  query_command: UNRESOLVED  # Source marks up the numeric path segment; no unformatted literal query is supplied.
  default: 0

- id: input_clock_sync
  label: Input Clock Sync State
  type: integer
  address: /status/clock/input/{input_number}/sync
  query_command: UNRESOLVED  # Source marks up the numeric path segment; no unformatted literal query is supplied.
  default: 3

- id: network_carrier
  label: Network Carrier
  type: integer
  address: /status/network/{port_number}/carrier
  query_command: "/status/network/1/carrier"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: 1

- id: network_duplex
  label: Network Duplex
  type: string
  values: [full, half]
  address: /status/network/{port_number}/duplex
  query_command: "/status/network/1/duplex"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: full

- id: network_ip_address
  label: Network IP Address
  type: string
  address: /status/network/{port_number}/ip_address
  query_command: "/status/network/1/ip_address"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: 169.254.7.39

- id: network_mac_address
  label: Network MAC Address
  type: string
  address: /status/network/{port_number}/mac_address
  query_command: "/status/network/1/mac_address"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: 00:1C:AB:00:8D:80

- id: network_speed
  label: Network Speed
  type: integer
  description: Speed in Mbps.
  address: /status/network/{port_number}/speed
  query_command: "/status/network/1/speed"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: 1000

- id: network_net_mask
  label: Network Net Mask
  type: string
  address: /status/network/{port_number}/net_mask
  query_command: "/status/network/1/net_mask"  # Literal source example; replace port segment 1 with port_number (1 or 2).
  default: 255.255.0.0

- id: gptp_clock_as_path_trace_id
  label: GPTP Clock AS Path Trace ID
  type: string
  description: Read-only trace identifier; port_number selects 1 or 2 and trace_number selects the documented entries 1 through 18. Replace the corresponding numeric segments in the literal query example.
  address: /status/clock/gptp/{port_number}/as_path/{trace_number}/trace_id
  query_command: "/status/clock/gptp/1/as_path/1/trace_id"
  default: ""

- id: gptp_clock_as_path_trace_length
  label: GPTP Clock AS Path Trace Length
  type: integer
  description: Read-only trace length; replace port segment 1 in the literal query example with port_number (1 or 2).
  address: /status/clock/gptp/{port_number}/as_path/trace_length
  query_command: "/status/clock/gptp/1/as_path/trace_length"
  default: 0

- id: gptp_clock_peer_delay
  label: GPTP Clock Peer Delay
  type: number
  description: Read-only peer delay; units and range are UNRESOLVED. Replace port segment 1 in the literal query example with port_number (1 or 2).
  address: /status/clock/gptp/{port_number}/peer_delay
  query_command: "/status/clock/gptp/1/peer_delay"
  default: 0

- id: gptp_clock_port_role
  label: GPTP Clock Port Role
  type: integer
  description: Read-only port role; value enum is UNRESOLVED. Replace port segment 1 in the literal query example with port_number (1 or 2).
  address: /status/clock/gptp/{port_number}/port_role
  query_command: "/status/clock/gptp/1/port_role"
  default: 3

- id: rtc_date_and_time
  label: RTC Date And Time
  type: string
  address: /status/clock/rtc/date_and_time
  query_command: "/status/clock/rtc/date_and_time"
  default: "2019-08-08T05:23:11"

- id: system_clock_input_number
  label: System Clock Input Number
  type: integer
  address: /status/clock/system/input_number
  query_command: "/status/clock/system/input_number"
  default: 1

- id: system_clock_sample_rate
  label: System Clock Sample Rate
  type: integer
  address: /status/clock/system/sample_rate
  query_command: "/status/clock/system/sample_rate"
  default: 96000

- id: system_clock_source
  label: System Clock Source
  type: integer
  description: Read-only clock source; value enum is UNRESOLVED.
  address: /status/clock/system/source
  query_command: "/status/clock/system/source"
  default: 0

- id: system_clock_sync
  label: System Clock Sync State
  type: integer
  description: Source lists this path twice with conflicting defaults 2 and 0; default and value enum are UNRESOLVED.
  address: /status/clock/system/sync
  query_command: "/status/clock/system/sync"

- id: word_clock_sync
  label: Word Clock Sync State
  type: integer
  description: Read-only sync state; value enum is UNRESOLVED.
  address: /status/clock/word_clock/sync
  query_command: "/status/clock/word_clock/sync"
  default: 3

- id: word_clock_termination
  label: Word Clock Termination
  type: integer
  description: Read-only termination status; value enum is UNRESOLVED.
  address: /status/clock/word_clock/termination
  query_command: "/status/clock/word_clock/termination"
  default: 0

- id: network_gateway
  label: Network Gateway
  type: string
  description: Read-only gateway; replace port segment 1 in the literal query example with port_number (1 or 2).
  address: /status/network/{port_number}/gateway
  query_command: "/status/network/1/gateway"
  default: ""
```

## Variables
```yaml
# Control points are the settable/readable state tree. The full tree has
# hundreds of leaves; this spec enumerates the major categories and a few
# representative leaves per category. Use the get/describe control-point
# verbs (Actions section) at runtime to inspect defaults and ranges per
# device. Regular expressions are accepted in the address field for
# bulk operations.

# --- Input processing (per source: inputs 1-8) ---
- id: input_gain
  label: Input Gain
  type: number
  units: dB
  address: /processing/input/{input_number}/gain
  default: 0
  scope: input_number in 1..8

- id: input_mute
  label: Input Mute
  type: boolean
  address: /processing/input/{input_number}/mute
  default: true
  scope: input_number in 1..8

- id: input_delay
  label: Input Delay
  type: number
  address: /processing/input/{input_number}/delay
  default: 0
  scope: input_number in 1..8

- id: input_delay_type
  label: Input Delay Type
  type: integer
  address: /processing/input/{input_number}/delay_type
  default: 0
  scope: input_number in 1..8

- id: input_eq_bypass
  label: Input EQ Bypass
  type: boolean
  address: /processing/input/{input_number}/eq/bypass
  default: false
  scope: input_number in 1..8

- id: input_eq_band_bypass
  label: Input EQ Band Bypass
  type: boolean
  address: /processing/input/{input_number}/eq/{band_number}/band_bypass
  default: false
  scope: input_number in 1..8, band_number in 1..5

- id: input_eq_bandwidth
  label: Input EQ Band Bandwidth
  type: number
  address: /processing/input/{input_number}/eq/{band_number}/bandwidth
  default: 1
  scope: input_number in 1..8, band_number in 1..5

- id: input_eq_frequency
  label: Input EQ Band Frequency
  type: number
  units: Hz
  address: /processing/input/{input_number}/eq/{band_number}/frequency
  scope: input_number in 1..8, band_number in 1..5
  # Per-band default frequencies from source: band 1=32, band 2=125, band 3=500, band 4=2000, band 5=8000

- id: input_eq_gain
  label: Input EQ Band Gain
  type: number
  units: dB
  address: /processing/input/{input_number}/eq/{band_number}/gain
  default: 0
  scope: input_number in 1..8, band_number in 1..5

- id: input_equalization_bypass
  label: Input Equalization Bypass
  type: boolean
  address: /processing/input/{input_number}/equalization_bypass
  default: false
  scope: input_number in 1..8

- id: input_ushaping_bypass
  label: Input U-Shaping Bypass
  type: boolean
  address: /processing/input/{input_number}/ushaping/bypass
  default: false
  scope: input_number in 1..8

- id: input_ushaping_frequency
  label: Input U-Shaping Band Frequency
  type: number
  units: Hz
  address: /processing/input/{input_number}/ushaping/{band_number}/frequency
  scope: input_number in 1..8, band_number in 1..5
  # Per-band default frequencies from source: band 1=62, band 2=250, band 3=1000, band 4=4000, band 5=undefined (gain only)

- id: input_ushaping_gain
  label: Input U-Shaping Band Gain
  type: number
  units: dB
  address: /processing/input/{input_number}/ushaping/{band_number}/gain
  default: 0
  scope: input_number in 1..8, band_number in 1..5

- id: input_ushaping_slope
  label: Input U-Shaping Band Slope
  type: integer
  address: /processing/input/{input_number}/ushaping/{band_number}/slope
  default: 2
  scope: input_number in 1..8, band_number in 1..4

# --- Output processing (per source: outputs 1-16) ---
- id: output_gain
  label: Output Gain
  type: number
  units: dB
  address: /processing/output/{output_number}/gain
  default: 0
  scope: output_number in 1..16

- id: output_mute
  label: Output Mute
  type: boolean
  address: /processing/output/{output_number}/mute
  default: false
  scope: output_number in 1..16

- id: output_delay
  label: Output Delay
  type: number
  address: /processing/output/{output_number}/delay
  default: 0
  scope: output_number in 1..16

- id: output_delay_type
  label: Output Delay Type
  type: integer
  address: /processing/output/{output_number}/delay_type
  default: 0
  scope: output_number in 1..16

- id: output_polarity_reversal
  label: Output Polarity Reversal
  type: boolean
  address: /processing/output/{output_number}/polarity_reversal
  default: false
  scope: output_number in 1..16

- id: output_atmospheric_bypass
  label: Output Atmospheric Bypass
  type: boolean
  address: /processing/output/{output_number}/atmospheric/bypass
  default: true
  scope: output_number in 1..16

- id: output_atmospheric_distance
  label: Output Atmospheric Distance
  type: number
  address: /processing/output/{output_number}/atmospheric/distance
  default: 0
  scope: output_number in 1..16

- id: output_atmospheric_gain
  label: Output Atmospheric Gain
  type: number
  address: /processing/output/{output_number}/atmospheric/gain
  default: 10
  scope: output_number in 1..16

- id: output_highpass_bypass
  label: Output Highpass Bypass
  type: boolean
  address: /processing/output/{output_number}/highpass/bypass
  default: true
  scope: output_number in 1..16

- id: output_highpass_frequency
  label: Output Highpass Frequency
  type: number
  units: Hz
  address: /processing/output/{output_number}/highpass/frequency
  default: 40
  scope: output_number in 1..16

- id: output_highpass_type
  label: Output Highpass Type
  type: integer
  address: /processing/output/{output_number}/highpass/type
  default: 11
  scope: output_number in 1..16

- id: output_lowpass_bypass
  label: Output Lowpass Bypass
  type: boolean
  address: /processing/output/{output_number}/lowpass/bypass
  default: true
  scope: output_number in 1..16

- id: output_lowpass_frequency
  label: Output Lowpass Frequency
  type: number
  units: Hz
  address: /processing/output/{output_number}/lowpass/frequency
  default: 160
  scope: output_number in 1..16

- id: output_lowpass_type
  label: Output Lowpass Type
  type: integer
  address: /processing/output/{output_number}/lowpass/type
  default: 11
  scope: output_number in 1..16

- id: output_eq_bypass
  label: Output EQ Bypass
  type: boolean
  address: /processing/output/{output_number}/eq/bypass
  default: false
  scope: output_number in 1..16

- id: output_eq_band_bypass
  label: Output EQ Band Bypass
  type: boolean
  address: /processing/output/{output_number}/eq/{band_number}/band_bypass
  default: false
  scope: output_number in 1..16, band_number in 1..10

- id: output_eq_bandwidth
  label: Output EQ Band Bandwidth
  type: number
  address: /processing/output/{output_number}/eq/{band_number}/bandwidth
  default: 1
  scope: output_number in 1..16, band_number in 1..10

- id: output_eq_frequency
  label: Output EQ Band Frequency
  type: number
  units: Hz
  address: /processing/output/{output_number}/eq/{band_number}/frequency
  scope: output_number in 1..16, band_number in 1..10
  # Per-band default frequencies from source: 32, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000

- id: output_eq_gain
  label: Output EQ Band Gain
  type: number
  units: dB
  address: /processing/output/{output_number}/eq/{band_number}/gain
  default: 0
  scope: output_number in 1..16, band_number in 1..10

- id: output_equalization_bypass
  label: Output Equalization Bypass
  type: boolean
  address: /processing/output/{output_number}/equalization_bypass
  default: false
  scope: output_number in 1..16

- id: output_ushaping_bypass
  label: Output U-Shaping Bypass
  type: boolean
  address: /processing/output/{output_number}/ushaping/bypass
  default: false
  scope: output_number in 1..16

- id: output_ushaping_frequency
  label: Output U-Shaping Band Frequency
  type: number
  units: Hz
  address: /processing/output/{output_number}/ushaping/{band_number}/frequency
  scope: output_number in 1..16, band_number in 1..5
  # Per-band default frequencies from source: 62, 250, 1000, 4000, band 5 (gain only)

- id: output_ushaping_gain
  label: Output U-Shaping Band Gain
  type: number
  units: dB
  address: /processing/output/{output_number}/ushaping/{band_number}/gain
  default: 0
  scope: output_number in 1..16, band_number in 1..5

- id: output_ushaping_slope
  label: Output U-Shaping Band Slope
  type: integer
  address: /processing/output/{output_number}/ushaping/{band_number}/slope
  default: 2
  scope: output_number in 1..16, band_number in 1..4

# --- Matrix processing (per source: inputs 1-32, crosspoints 1-16) ---
- id: matrix_gain
  label: Matrix Crosspoint Gain
  type: number
  units: dB
  address: /processing/matrix/{matrix_input}/{crosspoint}/gain
  scope: matrix_input in 1..32, crosspoint in 1..16
  note: Source notes only matrix input 1 crosspoints 1-8 and matrix input 2 crosspoints 9-16 default to 0; all other crosspoints default to -90. The maximum number of matrix crosspoints that may be set simultaneously is 232.

- id: matrix_delay
  label: Matrix Crosspoint Delay
  type: number
  address: /processing/matrix/{matrix_input}/{crosspoint}/delay
  default: 0
  scope: matrix_input in 1..32, crosspoint in 1..16

- id: matrix_delay_bypass
  label: Matrix Crosspoint Delay Bypass
  type: boolean
  address: /processing/matrix/{matrix_input}/{crosspoint}/delay_bypass
  default: false
  scope: matrix_input in 1..32, crosspoint in 1..16

- id: matrix_delay_type
  label: Matrix Crosspoint Delay Type
  type: integer
  address: /processing/matrix/{matrix_input}/{crosspoint}/delay_type
  default: 0
  scope: matrix_input in 1..32, crosspoint in 1..16

# --- System control points ---
- id: system_front_panel_lockout
  label: Front Panel Lockout
  type: boolean
  address: /system/hardware/front_panel_lockout
  default: false

- id: system_meter_demo_active
  label: System Meter Demo Active
  type: boolean
  address: /system/meter/demo/active
  default: false

- id: system_mode_running
  label: System Mode Running
  type: boolean
  description: True when the GALAXY is in normal operating mode (vs. Spacemap mode or similar).
  address: /system/mode/running
  default: true

- id: system_network_type
  label: System Network Port Type
  type: integer
  address: /system/network/{port_number}/type
  default: 0
  scope: port_number in 1..2

- id: system_network_static_ip_address
  label: System Network Static IP Address
  type: string
  address: /system/network/{port_number}/static/ip_address
  default: 192.168.0.2
  scope: port_number in 1..2

- id: system_network_static_net_mask
  label: System Network Static Net Mask
  type: string
  address: /system/network/{port_number}/static/net_mask
  default: 255.255.255.0
  scope: port_number in 1..2

- id: system_network_static_gateway
  label: System Network Static Gateway
  type: string
  address: /system/network/{port_number}/static/gateway
  default: 192.168.0.1
  scope: port_number in 1..2

- id: system_firmware_code
  label: System Firmware Code
  type: integer
  address: /system/firmware/code
  default: 0

- id: system_firmware_status
  label: System Firmware Status
  type: integer
  address: /system/firmware/status
  default: 0

# --- Device preferences and SIM ---
- id: device_preferences_brightness
  label: Device Front-Panel Brightness
  type: integer
  address: /device/preferences/brightness
  default: 1

- id: device_preferences_display_color
  label: Device Display Color
  type: integer
  address: /device/preferences/display_color
  default: 3

- id: device_sim_bus_address
  label: SIM3 Bus Address
  type: integer
  address: /device/sim/bus_address
  default: 10

- id: device_sim_configured
  label: SIM3 Configured
  type: boolean
  address: /device/sim/configured
  default: false

- id: device_sim_mute_relay
  label: SIM3 Mute Relay
  type: boolean
  address: /device/sim/mute_relay/{relay_number}
  default: true
  scope: relay_number in 1..4

- id: device_sim_probe_channel
  label: SIM3 Probe Channel
  type: integer
  address: /device/sim/probe/{probe_number}/channel
  default: 1
  scope: probe_number in 1..2

- id: device_sim_probe_point
  label: SIM3 Probe Point
  type: integer
  address: /device/sim/probe/{probe_number}/point
  scope: probe_number in 1..2
  # Source defaults: probe 1 point=2, probe 2 point=4

# --- Device input (per source: inputs 1-8 named A-H; matrix inputs 9-32) ---
- id: device_input_name
  label: Device Input Name
  type: string
  address: /device/input/{input_number}/name
  default: "Input A"  # default names A-H for inputs 1-8
  scope: input_number in 1..8

- id: device_input_mode
  label: Device Input Mode
  type: integer
  address: /device/input/{input_number}/mode
  default: 1
  scope: input_number in 1..8

- id: device_input_scale
  label: Device Input Scale
  type: integer
  address: /device/input/{input_number}/scale
  default: 26
  scope: input_number in 1..8

- id: device_input_select
  label: Device Input Select
  type: boolean
  address: /device/input/{input_number}/select
  default: false
  scope: input_number in 1..32

- id: device_input_isolate
  label: Device Input Isolate
  type: boolean
  address: /device/input/{input_number}/isolate
  default: false
  scope: input_number in 1..8

- id: device_input_link_group
  label: Device Input Link Group
  type: integer
  address: /device/input/{input_number}/input_link_group
  default: 0
  scope: input_number in 1..32

- id: device_input_aes_enable_asrc
  label: Device Input AES Enable ASRC
  type: boolean
  address: /device/input/{input_number}/aes/enable_asrc
  default: true
  scope: input_number in 1..8

- id: device_input_avb_controller_mode
  label: Device Input AVB Controller Mode
  type: integer
  address: /device/input/avb/controller_mode
  default: 0

- id: device_input_link_group_bypass
  label: Device Input Link Group Bypass
  type: boolean
  address: /device/input_link_group/{group_number}/bypass
  default: true
  scope: group_number in 1..4

- id: device_input_link_group_name
  label: Device Input Link Group Name
  type: string
  address: /device/input_link_group/{group_number}/name
  default: "Group 1"  # default names Group 1..Group 4
  scope: group_number in 1..4

# --- Device output (per source: outputs 1-16) ---
- id: device_output_name
  label: Device Output Name
  type: string
  address: /device/output/{output_number}/name
  default: "Output 1"
  scope: output_number in 1..16

- id: device_output_scale
  label: Device Output Scale
  type: integer
  address: /device/output/{output_number}/scale
  default: 26
  scope: output_number in 1..16

- id: device_output_select
  label: Device Output Select
  type: boolean
  address: /device/output/{output_number}/select
  default: false
  scope: output_number in 1..16

- id: device_output_isolate
  label: Device Output Isolate
  type: boolean
  address: /device/output/{output_number}/isolate
  default: false
  scope: output_number in 1..16

- id: device_output_mute_relay
  label: Device Output Mute Relay
  type: boolean
  address: /device/output/{output_number}/mute_relay
  default: false
  scope: output_number in 1..16

- id: device_output_output_link_group
  label: Device Output Link Group
  type: integer
  address: /device/output/{output_number}/output_link_group
  default: 0
  scope: output_number in 1..16

- id: device_output_sim_trim
  label: Device Output SIM3 Trim
  type: integer
  address: /device/output/{output_number}/sim/trim
  default: 0
  scope: output_number in 1..16

- id: device_output_link_group_bypass
  label: Device Output Link Group Bypass
  type: boolean
  address: /device/output_link_group/{group_number}/bypass
  default: true
  scope: group_number in 1..8

- id: device_output_link_group_name
  label: Device Output Link Group Name
  type: string
  address: /device/output_link_group/{group_number}/name
  default: "Group 1"  # default names Group 1..Group 8
  scope: group_number in 1..8

- id: device_output_avb_presentation_time
  label: Device Output AVB Presentation Time
  type: integer
  units: ns
  address: /device/output/avb/presentation_time
  default: 2000000

- id: device_output_atmospheric_altitude
  label: Device Output Atmospheric Altitude
  type: number
  address: /device/output/atmospheric/altitude
  default: 0

- id: device_output_atmospheric_humidity
  label: Device Output Atmospheric Humidity
  type: integer
  units: "%"
  address: /device/output/atmospheric/humidity
  default: 50

- id: device_output_atmospheric_temperature
  label: Device Output Atmospheric Temperature
  type: number
  units: K
  address: /device/output/atmospheric/temperature
  default: 293.15

# --- Project control points ---
- id: project_name
  label: Project Name
  type: string
  address: /project/name
  default: Default

- id: project_boot_snapshot_id
  label: Project Boot Snapshot ID
  type: integer
  address: /project/boot_snapshot_id
  default: 3

- id: project_metadata_content_type
  label: Project Metadata Content Type
  type: integer
  address: /project/metadata/content_type
  default: 2

- id: project_metadata_schema_version
  label: Project Metadata Schema Version
  type: integer
  address: /project/metadata/schema_version
  default: 10

- id: project_project_firmware_version
  label: Project Project Firmware Version
  type: string
  address: /project/project_firmware_version
  default: none

- id: project_snapshot_name
  label: Snapshot Name
  type: string
  address: /project/snapshot/{snapshot_id}/name
  scope: snapshot_id in 0..255
  note: Snapshot 0 defaults to name "Factory Defaults" and is locked.

- id: project_snapshot_comment
  label: Snapshot Comment
  type: string
  address: /project/snapshot/{snapshot_id}/comment
  scope: snapshot_id in 0..255
  note: Snapshot 0 defaults to "All settings are set to default values".

- id: project_snapshot_locked
  label: Snapshot Locked
  type: boolean
  address: /project/snapshot/{snapshot_id}/locked
  scope: snapshot_id in 0..255
  note: Snapshot 0 defaults to true; other snapshots default to false.

- id: project_snapshot_modified
  label: Snapshot Modified
  type: boolean
  address: /project/snapshot/{snapshot_id}/modified
  default: false
  scope: snapshot_id in 0..255

- id: project_snapshot_created
  label: Snapshot Created Timestamp
  type: string
  address: /project/snapshot/{snapshot_id}/created
  scope: snapshot_id in 0..255

- id: project_snapshot_last_updated
  label: Snapshot Last Updated Timestamp
  type: string
  address: /project/snapshot/{snapshot_id}/last_updated
  scope: snapshot_id in 0..255

- id: project_snapshot_active_id
  label: Active Snapshot ID
  type: integer
  address: /project/snapshot/active/id
  default: -1

# --- Entity (device identity) control points ---
- id: entity_entity_id
  label: Entity ID
  type: string
  address: /entity/entity_id
  default: 0x1cabfffe008d80

- id: entity_entity_model_id
  label: Entity Model ID
  type: string
  address: /entity/entity_model_id
  default: 0x1cabb804004005

- id: entity_entity_name
  label: Entity Name
  type: string
  address: /entity/entity_name
  default: GALAXY-18139889

- id: entity_firmware_version
  label: Entity Firmware Version
  type: string
  address: /entity/firmware_version
  default: 2.1.0-R4-1907032112

- id: entity_group_name
  label: Entity Group Name
  type: string
  address: /entity/group_name
  default: GALAXYs

- id: entity_serial_number
  label: Entity Serial Number
  type: string
  address: /entity/serial_number
  default: 18139889

- id: entity_input_channel_count
  label: Entity Input Channel Count
  type: integer
  address: /entity/input_channel_count
  default: 64

- id: entity_input_stream_count
  label: Entity Input Stream Count
  type: integer
  address: /entity/input_stream_count
  default: 18

- id: entity_output_channel_count
  label: Entity Output Channel Count
  type: integer
  address: /entity/output_channel_count
  default: 24

- id: entity_output_stream_count
  label: Entity Output Stream Count
  type: integer
  address: /entity/output_stream_count
  default: 14
```

## Events
```yaml
# Unsolicited notifications the server may send:

- id: subscribed_control_point_update
  label: Subscribed Control Point Update
  description: |
    When a control point is subscribed to (via `+` ASCII or `/subscribe/...` OSC),
    the server pushes the current value and all subsequent changes to the
    subscriber at the requested rate (0-100 ms; default 30 ms).
  direction: server -> client
  triggered_by: subscribe_control_point

- id: pong
  label: Pong Response
  description: |
    Returned by the server in response to a :ping (ASCII) or /ping (OSC) command.
    Includes the keyword string supplied by the client. Source notes: a client
    cannot send a pong command - pong is only ever a server reply to ping.
  direction: server -> client
  triggered_by: ping
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes

**Termination.** All ASCII text commands must end with a CR (`0d`) or LF (`0a`) byte. The command strings in the Actions section show the printable form without the terminator; implementations must append `0d` or `0a`.

**OSC argument types.** OSC supports: `i` 32-bit integer, `f` 32-bit float, `s` string, `F` Boolean false, `T` Boolean true, `h` 64-bit integer. Source notes: "Because some clients do not adhere to the OSC protocol governing argument types, GALAXY is programmed to type cast from integer to Boolean. For example, Boolean True is any positive non-zero integer."

**Subscription lifetimes.**
- TCP: subscription remains active until an unsubscribe or until the TCP connection breaks.
- UDP: subscription remains active until an unsubscribe or until the server receives no UDP packets from the client for at least 30 seconds. Use a no-arg `:ping` (or empty OSC ping) as a keepalive.

**Regular expressions.** Address fields support regex wildcards: `.` (any single char), `*` (any sequence), `\d` (any single digit), `\d+` (any integer). Example: `/processing/input/\d/mute=true` mutes inputs 1-8; `/processing/output/\d+/mute=false` unmutes all outputs.

**Snapshot exclusion codes** (for `recall_snapshot` second argument, sum to combine):
- 1 = exclusion enabled, nothing excluded
- 2 = Input Channel Types
- 4 = Input and Output Voltage Ranges
- 8 = Input and Output Mute
- 16 = Update active snapshot before recall
- 32 = SIM3 Bus Address
- 64 = SIM3 Probe Point
- 128 = Clock Sync Mode
- 256 = AVB Configuration

**Virtual GALAXY ports.** Physical GALAXY devices use ASCII port 25003 and OSC port 25004. Virtual GALAXY processors use a different port scheme depending on operating mode:
- Normal mode: virtual #1 starts at ASCII 50503 / OSC 50504. Decrement by 100 per additional virtual processor.
- Spacemap mode: virtual #1 starts at ASCII 25003 / OSC 25004. Increment by 100 per additional virtual processor.
- Check the Log tab in Compass to determine the port address of any specific GALAXY device.

**Operating modes.** The GALAXY has two independent operating modes: normal (loudspeaker management via Compass / Compass Go) and Spacemap (spatial mixing via Spacemap Go). Port numbering for virtual processors differs between modes.

**mDNS addressing.** Two constructions: (1) `<Entity Name>.<Group Name>.local` per Compass config, or (2) `<device-type-serial>.local` where device type is `mslg-gx-408`, `mslg-gx-816`, `mslg-gx-816aes`, or `mslg-gx-bluehorn`. Example: `mslg-gx-816-16342723.local`.

**Client tooling.** Source notes: "Telnet is not available on the current macOS. Use the `netcat` command (nc) instead."

**OSC path typo in source.** The source's OSC MSG example for `update_snapshot` shows `/update_snaphot,i 6` (misspelled). The accompanying ASCII Hex bytes spell the path correctly as `update_snapshot`, and the same spelling is used for ASCII and for the UDP/TCP OSC hex forms. This spec uses the canonical `update_snapshot` spelling in all action commands.

**OSC type typo in source.** The source's `connected_osc_upd_client_count` (UDP) is a misspelling of `udp`; the same default is shown under the clearly-intended `connected_osc_udp_client_count` elsewhere. This spec uses `connected_osc_udp_client_count`.

**Status read-only.** All `/status/...` control points are read-only. Attempting to set a status control point returns an error message. Default values shown are representative and may differ per device.

**Entity defaults vary by device.** Source explicitly notes that only `input_channel_count`, `input_stream_count`, `output_channel_count`, and `output_stream_count` entity defaults are consistent across all GALAXY devices; other entity defaults (entity_id, entity_name, serial_number, firmware_version, group_name, etc.) are device-specific.

**Snapshot range.** Snapshots are numbered 0-255. Snapshot 0 is "Factory Defaults" and is locked by default. Recall via `:recall_snapshot` requires the snapshot to already exist (except `:create_snapshot`); the active snapshot ID is `-1` when no snapshot is selected.

**Unknown input/output defaults on isolated controls.** The source lists `/device/output/atmospheric/altitude` with default 0 and `/device/output/atmospheric/temperature` with default 293.15 (Kelvin). The same atmospheric control points appear under `/processing/output/.../atmospheric/...` with different defaults (gain=10, bypass=true, distance=0). Both trees are present in the source.

## Provenance

```yaml
source_domains:
  - docs.meyersound.com
source_urls:
  - https://docs.meyersound.com/products/en/programming-guide---galileo-galaxy.html
  - https://docs.meyersound.com/products/en/user-guide---galileo-galaxy.html
retrieved_at: 2026-05-13T07:42:59.056Z
last_checked_at: 2026-10-07T20:54:17.661Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:54:17.661Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "All 66 action units match source literals and shapes; the transport ports are supported and auth is honestly UNRESOLVED; only two regex examples are unrepresented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "/processing/output/\\d+/mute=false"
- "/processing/(in\\|out)put/1/mute=true"
- "hardware features (analog vs. AES I/O counts, AVB stream counts) differ across the four models in the family; the OSC/ASCII control surface described here is shared, but per-model input/output channel counts are device-specific. Source explicitly notes entity defaults such as input_channel_count and output_channel_count are device-specific."
- "source documents no multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
