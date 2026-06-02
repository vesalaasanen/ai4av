---
spec_id: admin/meyer-sound-galileo-galaxy
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meyer Sound Galileo GALAXY Network Platform Control Spec"
manufacturer: "Meyer Sound"
model_family: "GALAXY 408"
aliases: []
compatible_with:
  manufacturers:
    - "Meyer Sound"
  models:
    - "GALAXY 408"
    - "GALAXY 816"
    - "GALAXY 816-AES"
    - "Bluehorn 816"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.meyersound.com
  - applicationmarket.crestron.com
source_urls:
  - https://docs.meyersound.com/products/en/programming-guide---galileo-galaxy.html
  - https://docs.meyersound.com/products/en/user-guide---galileo-galaxy.html
  - https://applicationmarket.crestron.com/meyer-sound-galileo/
retrieved_at: 2026-04-26T18:21:57.350Z
last_checked_at: 2026-06-02T17:23:31.251Z
generated_at: 2026-06-02T17:23:31.251Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "/project/snapshot/{id}/created"
  - "/project/snapshot/{id}/last_updated"
  - "/project/snapshot/{id}/modified"
  - /project/snapshot/active/comment
  - /project/snapshot/active/created
  - /project/snapshot/active/last_updated
  - /project/snapshot/active/locked
  - /project/snapshot/active/modified
  - /project/snapshot/active/name
  - "Spacemap-mode control points not enumerated in source; firmware version requirements for the control plane are not specified."
  - "source does not document any higher-level multi-step macros"
  - "no multi-step macro sequences in source"
  - "source does not document safety warnings, interlocks, or"
  - "firmware version requirements for the control-plane server are not stated; some control point default values may differ across GALAXY 408 / 816 / 816-AES / Bluehorn variants. The \"Additional documents\" row that appears inside the input-EQ table (line 593 of the source) appears to be a markdown extraction artifact rather than a real control point and has been omitted."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:31.251Z
  matched_actions: 134
  action_count: 134
  confidence: medium
  summary: "All 134 spec actions match verbatim control-point paths in the source tables; transport ports 25003/25004/50503/50504 are confirmed in Table 1. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Meyer Sound Galileo GALAXY Network Platform Control Spec

## Summary
The Meyer Sound GALAXY Network Platform is a loudspeaker management processor exposing a Control Plane server that lets multiple clients (Compass software, Compass Go, Spacemap Go, or third-party controllers) exchange control and status messages over the network. The server speaks two protocols: a line-oriented ASCII command set on TCP and Open Sound Control (OSC) over either TCP or UDP. Addressable control points cover snapshot recall/management, per-input and per-output processing (mute, gain, delay, EQ, highpass/lowpass, polarity, ushaping, atmospheric), matrix cross-points, device I/O configuration, project settings, and entity identification. This spec covers the ASCII and OSC interfaces; it does not cover Compass application behavior.

<!-- UNRESOLVED: Spacemap-mode control points not enumerated in source; firmware version requirements for the control plane are not specified. -->

## Transport
```yaml
# The GALAXY server supports three transport bindings simultaneously:
#   - ASCII over TCP/IP (port 25003 for physical GALAXY 1; +100 per additional physical)
#   - OSC   over TCP/IP (port 25004 for physical GALAXY 1; +100 per additional physical)
#   - OSC   over UDP     (same port 25004; UDP has a 30-second keepalive requirement)
#
# Virtual GALAXY: ASCII port 50503 (OSC 50504) for virtual #1, decrement by 100 per
# additional virtual in Normal mode; in Spacemap mode use 25003 (OSC 25004) and
# increment by 100 per additional virtual.
#
# IPv4, IPv6, and mDNS addresses are all accepted (e.g. `telnet 192.168.71.146 25003`
# or `telnet MyGalaxy.MyGroup.local 25003` or
# `telnet mslg-gx-816-16342723.local 25003`).
protocols:
  - tcp
  - udp
  - osc
addressing:
  port: 25003        # ASCII TCP server (default physical GALAXY 1)
  osc_port: 25004    # OSC TCP/UDP server (default physical GALAXY 1)
  ascii_port_virtual_normal: 50503   # ASCII port for first virtual GALAXY (Normal mode)
  osc_port_virtual_normal: 50504     # OSC port for first virtual GALAXY (Normal mode)
  ascii_port_virtual_spacemap: 25003 # ASCII port for first virtual GALAXY (Spacemap mode)
  osc_port_virtual_spacemap: 25004   # OSC port for first virtual GALAXY (Spacemap mode)
auth:
  type: none  # inferred: no auth procedure in source
notes:
  - "All ASCII text messages must terminate with CR (0x0d) or LF (0x0a)."
  - "OSC over TCP uses 4-byte big-endian length prefix; OSC over UDP is unprefixed."
  - "UDP subscription lifetime: 30 seconds since last packet; resend empty /ping to keep alive."
  - "Telnet is not available on current macOS - use `nc` instead."
```

## Traits
```yaml
# Inferred from documented control points and command examples:
- queryable       # get / get-description / status commands present
- routable        # matrix cross-point gain, device input/output select present
- levelable       # per-input / per-output gain, EQ, highpass/lowpass, atmospheric, ushaping gain
- snapshotable    # recall_snapshot / update_snapshot / create_snapshot / delete_snapshot
```

## Actions
```yaml
# --- Built-in server commands (named in source as discrete rows) ---

- id: recall_snapshot
  label: Recall Snapshot
  kind: action
  command: ":recall_snapshot {id}"
  params:
    - name: id
      type: integer
      description: Snapshot ID to recall (0-255 per source)
    - name: exclusion_code
      type: integer
      description: "Optional exclusion bitmask (1=exclusion enabled, +2 channel types, +4 voltage ranges, +8 mute, +16 update active before recall, +32 SIM3 bus, +64 SIM3 probe, +128 clock sync, +256 AVB)"
  ascii_hex_example: "3a 72 65 63 61 6c 6c 5f 73 6e 61 70 73 68 6f 74 20 33 20 39 20 0a"
  osc_example: "/recall_snapshot,i 3 9"

- id: update_snapshot
  label: Update Snapshot
  kind: action
  command: ":update_snapshot {id}"
  params:
    - name: id
      type: integer
      description: Snapshot ID to overwrite with current settings (0-255 per source)
  ascii_hex_example: "3a 75 70 64 61 74 65 5f 73 6e 61 70 73 68 6f 74 20 36 0a"
  osc_example: "/update_snapshot,i 6"

- id: create_snapshot
  label: Create Snapshot
  kind: action
  command: ":create_snapshot {name} {comment}"
  params:
    - name: name
      type: string
      description: Name for the new snapshot
    - name: comment
      type: string
      description: Optional comment for the new snapshot
  ascii_hex_example: "3a 63 72 65 61 74 65 5f 73 6e 61 70 73 68 6f 74 20 53 61 6d 70 6c 65 20 48 65 6c 6c 6f 0a"
  osc_example: "/create_snapshot,ss Sample Hello"

- id: delete_snapshot
  label: Delete Snapshot
  kind: action
  command: ":delete_snapshot {id}"
  params:
    - name: id
      type: integer
      description: Snapshot ID to delete (0-255 per source)
  ascii_hex_example: "3a 64 65 6c 65 74 65 5f 73 6e 61 70 73 68 6f 74 20 36 0a"
  osc_example: "/delete_snapshot,h 6"

- id: ping
  label: Ping (keepalive)
  kind: action
  command: ":ping {keyword}"
  params:
    - name: keyword
      type: string
      description: Free-form string echoed back in the pong response, used to correlate ping/pong
  ascii_hex_example: "3a 70 69 6e 67 20 48 65 6c 6c 6f 20 57 6f 72 6c 64 0a"
  osc_example: "/ping,s Hello World"

- id: help
  label: Built-in Help (?)
  kind: action
  command: ":?"
  params: []
  ascii_hex_example: "3a 3f 0a"
  notes: "ASCII only - OSC equivalent is N/A per source."

# --- Control point functions (the 5 ASCII control characters / OSC forms) ---

- id: cp_set_value
  label: Set Control Point Value
  kind: action
  command: "{path}={value}"
  ascii_hex_example: "2f 70 72 6f 63 65 73 73 69 6e 67 2f 69 6e 70 75 74 2f 31 2f 6d 75 74 65 3d 74 72 75 65 0a"
  osc_example: "/{path},T|F|i|f|s {value}"
  params:
    - name: path
      type: string
      description: Full control-point path (e.g. /processing/input/1/mute)
    - name: value
      type: string
      description: OSC type cast allowed: positive non-zero integer = True; 0 = False; floats and strings per control-point type
  notes: "ASCII control character `=` is appended to the path; OSC message carries the value as a typed argument."

- id: cp_get_value
  label: Get Control Point Value
  kind: query
  command: "{path}"
  ascii_hex_example: "2f 70 72 6f 63 65 73 73 69 6e 67 2f 69 6e 70 75 74 2f 31 2f 6d 75 74 65 0a"
  osc_example: "/{path},"
  params:
    - name: path
      type: string
      description: Full control-point path
  notes: "ASCII uses bare path (no control character); OSC uses an empty type tag."

- id: cp_get_description
  label: Get Control Point Description
  kind: query
  command: "?{path}"
  ascii_hex_example: "3f 2f 70 72 6f 63 65 73 73 69 6e 67 2f 69 6e 70 75 74 2f 31 2f 6d 75 74 65 0a"
  params:
    - name: path
      type: string
      description: Full control-point path
  notes: "Returns JSON-like description with fields description, read_only, name, value, minimum, maximum, default, step, units. ASCII only - OSC N/A per source."

- id: cp_subscribe
  label: Subscribe to Control Point
  kind: action
  command: "+{path} {interval_ms}"
  ascii_hex_example: "2b 2f 70 72 6f 63 65 73 73 69 6e 67 2f 69 6e 70 75 74 2f 31 2f 6d 75 74 65 20 31 30 30 0a"
  osc_example: "/subscribe/{path},i 100"
  params:
    - name: path
      type: string
      description: Full control-point path (regular expression supported)
    - name: interval_ms
      type: integer
      description: Update interval in milliseconds (0-100; default 30)
  notes: "Server pushes current value then resends on each change at the requested rate."

- id: cp_unsubscribe
  label: Unsubscribe from Control Point
  kind: action
  command: "-{path}"
  ascii_hex_example: "2d 2f 70 72 6f 63 65 73 73 69 6e 67 2f 69 6e 70 75 74 2f 31 2f 6d 75 74 65 0a"
  osc_example: "/unsubscribe/{path},"
  params:
    - name: path
      type: string
      description: Full control-point path

# --- Input processing (1-8) - concrete parameterised commands ---

- id: set_input_mute
  label: Set Input Mute
  kind: action
  command: "/processing/input/{channel}/mute={value}"
  ascii_hex_example: "2f 70 72 6f 63 65 73 73 69 6e 67 2f 69 6e 70 75 74 2f 31 2f 6d 75 74 65 3d 74 72 75 65 0a"
  osc_example: "/processing/input/{channel}/mute,T"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: value
      type: enum
      values: [true, false]

- id: set_input_gain
  label: Set Input Gain
  kind: action
  command: "/processing/input/{channel}/gain={value}"
  ascii_hex_example: "2f 70 72 6f 63 65 73 73 69 6e 67 2f 69 6e 70 75 74 2f 31 2f 67 61 69 6e 3d 2d 39 30 0a"
  osc_example: "/processing/input/{channel}/gain,f {value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: value
      type: float
      description: Gain in dB (range: -90 to 0 per source example)

- id: set_input_delay
  label: Set Input Delay
  kind: action
  command: "/processing/input/{channel}/delay={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: value
      type: float
      description: Delay value (units not specified in source)

- id: set_input_delay_type
  label: Set Input Delay Type
  kind: action
  command: "/processing/input/{channel}/delay_type={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: value
      type: integer
      description: Delay type enum (default '0'; other values not enumerated in source)

- id: set_input_eq_band_bypass
  label: Set Input EQ Band Bypass
  kind: action
  command: "/processing/input/{channel}/eq/{band}/band_bypass={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: band
      type: integer
      description: EQ band 1-5
    - name: value
      type: enum
      values: [true, false]

- id: set_input_eq_bandwidth
  label: Set Input EQ Bandwidth
  kind: action
  command: "/processing/input/{channel}/eq/{band}/bandwidth={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: band
      type: integer
      description: EQ band 1-5
    - name: value
      type: float
      description: Bandwidth value (default '1' in source)

- id: set_input_eq_frequency
  label: Set Input EQ Frequency
  kind: action
  command: "/processing/input/{channel}/eq/{band}/frequency={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: band
      type: integer
      description: EQ band 1-5
    - name: value
      type: float
      description: Frequency in Hz (default per source: 32, 125, 500, 2000, 8000)

- id: set_input_eq_gain
  label: Set Input EQ Gain
  kind: action
  command: "/processing/input/{channel}/eq/{band}/gain={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: band
      type: integer
      description: EQ band 1-5
    - name: value
      type: float
      description: Gain in dB (default '0' in source)

- id: set_input_eq_bypass
  label: Set Input EQ Bypass
  kind: action
  command: "/processing/input/{channel}/eq/bypass={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: value
      type: enum
      values: [true, false]

- id: set_input_equalization_bypass
  label: Set Input Equalization Bypass
  kind: action
  command: "/processing/input/{channel}/equalization_bypass={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: value
      type: enum
      values: [true, false]

- id: set_input_ushaping_frequency
  label: Set Input U-Shaping Frequency
  kind: action
  command: "/processing/input/{channel}/ushaping/{band}/frequency={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: band
      type: integer
      description: U-shaping band 1-5
    - name: value
      type: float
      description: Frequency in Hz (default per source: 62, 250, 1000, 4000, -)

- id: set_input_ushaping_gain
  label: Set Input U-Shaping Gain
  kind: action
  command: "/processing/input/{channel}/ushaping/{band}/gain={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: band
      type: integer
      description: U-shaping band 1-5
    - name: value
      type: float
      description: Gain in dB (default '0' in source)

- id: set_input_ushaping_slope
  label: Set Input U-Shaping Slope
  kind: action
  command: "/processing/input/{channel}/ushaping/{band}/slope={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: band
      type: integer
      description: U-shaping band 1-5
    - name: value
      type: float
      description: Slope (default '2' in source)

- id: set_input_ushaping_bypass
  label: Set Input U-Shaping Bypass
  kind: action
  command: "/processing/input/{channel}/ushaping/bypass={value}"
  params:
    - name: channel
      type: integer
      description: Input number 1-8
    - name: value
      type: enum
      values: [true, false]

# --- Output processing (1-16) - concrete parameterised commands ---

- id: set_output_mute
  label: Set Output Mute
  kind: action
  command: "/processing/output/{channel}/mute={value}"
  ascii_hex_example: "2f 70 72 6f 63 65 73 73 69 6e 67 2f 6f 75 74 70 75 74 2f 31 2f 6d 75 74 65 3d 74 72 75 65 0a"
  osc_example: "/processing/output/{channel}/mute,T"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_output_gain
  label: Set Output Gain
  kind: action
  command: "/processing/output/{channel}/gain={value}"
  ascii_hex_example: "2f 70 72 6f 63 65 73 73 69 6e 67 2f 6f 75 74 70 75 74 2f 31 2f 67 61 69 6e 3d 2d 39 30 0a"
  osc_example: "/processing/output/{channel}/gain,f {value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: float
      description: Gain in dB (range -90 to 0 per source example)

- id: set_output_delay
  label: Set Output Delay
  kind: action
  command: "/processing/output/{channel}/delay={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: float
      description: Delay value (units not specified in source)

- id: set_output_delay_type
  label: Set Output Delay Type
  kind: action
  command: "/processing/output/{channel}/delay_type={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: integer
      description: Delay type enum (default '0' in source)

- id: set_output_eq_band_bypass
  label: Set Output EQ Band Bypass
  kind: action
  command: "/processing/output/{channel}/eq/{band}/band_bypass={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: band
      type: integer
      description: EQ band 1-10
    - name: value
      type: enum
      values: [true, false]

- id: set_output_eq_bandwidth
  label: Set Output EQ Bandwidth
  kind: action
  command: "/processing/output/{channel}/eq/{band}/bandwidth={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: band
      type: integer
      description: EQ band 1-10
    - name: value
      type: float
      description: Bandwidth value (default '1' in source)

- id: set_output_eq_frequency
  label: Set Output EQ Frequency
  kind: action
  command: "/processing/output/{channel}/eq/{band}/frequency={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: band
      type: integer
      description: EQ band 1-10
    - name: value
      type: float
      description: Frequency in Hz (default per source: 32, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000)

- id: set_output_eq_gain
  label: Set Output EQ Gain
  kind: action
  command: "/processing/output/{channel}/eq/{band}/gain={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: band
      type: integer
      description: EQ band 1-10
    - name: value
      type: float
      description: Gain in dB (default '0' in source)

- id: set_output_eq_bypass
  label: Set Output EQ Bypass
  kind: action
  command: "/processing/output/{channel}/eq/bypass={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_output_equalization_bypass
  label: Set Output Equalization Bypass
  kind: action
  command: "/processing/output/{channel}/equalization_bypass={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_output_polarity_reversal
  label: Set Output Polarity Reversal
  kind: action
  command: "/processing/output/{channel}/polarity_reversal={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_output_highpass_bypass
  label: Set Output Highpass Bypass
  kind: action
  command: "/processing/output/{channel}/highpass/bypass={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_output_highpass_frequency
  label: Set Output Highpass Frequency
  kind: action
  command: "/processing/output/{channel}/highpass/frequency={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: float
      description: Frequency in Hz (default '40' in source)

- id: set_output_highpass_type
  label: Set Output Highpass Type
  kind: action
  command: "/processing/output/{channel}/highpass/type={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: integer
      description: Highpass type enum (default '11' in source; meaning not stated)

- id: set_output_lowpass_bypass
  label: Set Output Lowpass Bypass
  kind: action
  command: "/processing/output/{channel}/lowpass/bypass={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_output_lowpass_frequency
  label: Set Output Lowpass Frequency
  kind: action
  command: "/processing/output/{channel}/lowpass/frequency={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: float
      description: Frequency in Hz (default '160' in source)

- id: set_output_lowpass_type
  label: Set Output Lowpass Type
  kind: action
  command: "/processing/output/{channel}/lowpass/type={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: integer
      description: Lowpass type enum (default '11' in source; meaning not stated)

- id: set_output_atmospheric_bypass
  label: Set Output Atmospheric Bypass
  kind: action
  command: "/processing/output/{channel}/atmospheric/bypass={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_output_atmospheric_distance
  label: Set Output Atmospheric Distance
  kind: action
  command: "/processing/output/{channel}/atmospheric/distance={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: float
      description: Distance (units not specified; default '0' in source)

- id: set_output_atmospheric_gain
  label: Set Output Atmospheric Gain
  kind: action
  command: "/processing/output/{channel}/atmospheric/gain={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: float
      description: Gain in dB (default '10' in source)

- id: set_output_ushaping_frequency
  label: Set Output U-Shaping Frequency
  kind: action
  command: "/processing/output/{channel}/ushaping/{band}/frequency={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: band
      type: integer
      description: U-shaping band 1-5
    - name: value
      type: float
      description: Frequency in Hz

- id: set_output_ushaping_gain
  label: Set Output U-Shaping Gain
  kind: action
  command: "/processing/output/{channel}/ushaping/{band}/gain={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: band
      type: integer
      description: U-shaping band 1-5
    - name: value
      type: float
      description: Gain in dB (default '0' in source)

- id: set_output_ushaping_slope
  label: Set Output U-Shaping Slope
  kind: action
  command: "/processing/output/{channel}/ushaping/{band}/slope={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: band
      type: integer
      description: U-shaping band 1-5
    - name: value
      type: float
      description: Slope (default '2' in source)

- id: set_output_ushaping_bypass
  label: Set Output U-Shaping Bypass
  kind: action
  command: "/processing/output/{channel}/ushaping/bypass={value}"
  params:
    - name: channel
      type: integer
      description: Output number 1-16
    - name: value
      type: enum
      values: [true, false]

# --- Matrix cross-points (inputs 1-32 × outputs 1-16) ---

- id: set_matrix_gain
  label: Set Matrix Cross-Point Gain
  kind: action
  command: "/processing/matrix/{input}/{output}/gain={value}"
  params:
    - name: input
      type: integer
      description: Matrix input 1-32
    - name: output
      type: integer
      description: Matrix cross-point (output) 1-16
    - name: value
      type: float
      description: Gain in dB (default '0' for input 1 cross-points 1-8 and input 2 cross-points 9-16; default '-90' for all other cross-points)
  notes: "Maximum 232 matrix cross-points may be set in a single command."

- id: set_matrix_delay
  label: Set Matrix Cross-Point Delay
  kind: action
  command: "/processing/matrix/{input}/{output}/delay={value}"
  params:
    - name: input
      type: integer
      description: Matrix input 1-32
    - name: output
      type: integer
      description: Matrix cross-point 1-16
    - name: value
      type: float
      description: Delay value (default '0' in source)

- id: set_matrix_delay_bypass
  label: Set Matrix Cross-Point Delay Bypass
  kind: action
  command: "/processing/matrix/{input}/{output}/delay_bypass={value}"
  params:
    - name: input
      type: integer
      description: Matrix input 1-32
    - name: output
      type: integer
      description: Matrix cross-point 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_matrix_delay_type
  label: Set Matrix Cross-Point Delay Type
  kind: action
  command: "/processing/matrix/{input}/{output}/delay_type={value}"
  params:
    - name: input
      type: integer
      description: Matrix input 1-32
    - name: output
      type: integer
      description: Matrix cross-point 1-16
    - name: value
      type: integer
      description: Delay type enum (default '0' in source)

- id: set_matrix_name
  label: Set Matrix Name
  kind: action
  command: "/processing/matrix/Matrix={value}"
  params:
    - name: value
      type: string
      description: Matrix display name

# --- System control points ---

- id: set_front_panel_lockout
  label: Set Front Panel Lockout
  kind: action
  command: "/system/hardware/front_panel_lockout={value}"
  params:
    - name: value
      type: enum
      values: [true, false]

- id: set_meter_demo_active
  label: Set Meter Demo Active
  kind: action
  command: "/system/meter/demo/active={value}"
  params:
    - name: value
      type: enum
      values: [true, false]

- id: set_mode_running
  label: Set Mode Running
  kind: action
  command: "/system/mode/running={value}"
  params:
    - name: value
      type: enum
      values: [true, false]

- id: set_network1_static_ip
  label: Set Network 1 Static IP
  kind: action
  command: "/system/network/1/static/ip_address={value}"
  params:
    - name: value
      type: string
      description: IPv4 address (default '192.168.0.2' in source)

- id: set_network1_static_gateway
  label: Set Network 1 Static Gateway
  kind: action
  command: "/system/network/1/static/gateway={value}"
  params:
    - name: value
      type: string
      description: IPv4 address (default '192.168.0.1' in source)

- id: set_network1_static_netmask
  label: Set Network 1 Static Net Mask
  kind: action
  command: "/system/network/1/static/net_mask={value}"
  params:
    - name: value
      type: string
      description: Net mask (default '255.255.255.0' in source)

- id: set_network1_type
  label: Set Network 1 Type
  kind: action
  command: "/system/network/1/type={value}"
  params:
    - name: value
      type: integer
      description: Network addressing type enum (default '0' in source; meaning not stated)

- id: set_network2_static_ip
  label: Set Network 2 Static IP
  kind: action
  command: "/system/network/2/static/ip_address={value}"
  params:
    - name: value
      type: string
      description: IPv4 address (default '192.168.0.3' in source)

- id: set_network2_static_gateway
  label: Set Network 2 Static Gateway
  kind: action
  command: "/system/network/2/static/gateway={value}"
  params:
    - name: value
      type: string
      description: IPv4 address (default '192.168.0.1' in source)

- id: set_network2_static_netmask
  label: Set Network 2 Static Net Mask
  kind: action
  command: "/system/network/2/static/net_mask={value}"
  params:
    - name: value
      type: string
      description: Net mask (default '255.255.255.0' in source)

- id: set_network2_type
  label: Set Network 2 Type
  kind: action
  command: "/system/network/2/type={value}"
  params:
    - name: value
      type: integer
      description: Network addressing type enum (default '0' in source; meaning not stated)

# --- Device preferences / SIM / input / output / link groups / AVB ---

- id: set_brightness
  label: Set Display Brightness
  kind: action
  command: "/device/preferences/brightness={value}"
  params:
    - name: value
      type: integer
      description: Brightness (default '1' in source; range not stated)

- id: set_display_color
  label: Set Display Color
  kind: action
  command: "/device/preferences/display_color={value}"
  params:
    - name: value
      type: integer
      description: Display color enum (default '3' in source; meaning not stated)

- id: set_sim_bus_address
  label: Set SIM Bus Address
  kind: action
  command: "/device/sim/bus_address={value}"
  params:
    - name: value
      type: integer
      description: SIM bus address (default '10' in source)

- id: set_sim_configured
  label: Set SIM Configured
  kind: action
  command: "/device/sim/configured={value}"
  params:
    - name: value
      type: enum
      values: [true, false]

- id: set_sim_mute_relay
  label: Set SIM Mute Relay
  kind: action
  command: "/device/sim/mute_relay/{relay}={value}"
  params:
    - name: relay
      type: integer
      description: Mute relay 1-4
    - name: value
      type: enum
      values: [true, false]

- id: set_sim_probe_channel
  label: Set SIM Probe Channel
  kind: action
  command: "/device/sim/probe/{probe}/channel={value}"
  params:
    - name: probe
      type: integer
      description: Probe 1-2
    - name: value
      type: integer
      description: SIM probe channel

- id: set_sim_probe_point
  label: Set SIM Probe Point
  kind: action
  command: "/device/sim/probe/{probe}/point={value}"
  params:
    - name: probe
      type: integer
      description: Probe 1-2
    - name: value
      type: integer
      description: SIM probe point

- id: set_device_input_aes_asrc
  label: Set Device Input AES ASRC
  kind: action
  command: "/device/input/{input}/aes/enable_asrc={value}"
  params:
    - name: input
      type: integer
      description: Input 1-8
    - name: value
      type: enum
      values: [true, false]

- id: set_device_input_link_group
  label: Set Device Input Link Group
  kind: action
  command: "/device/input/{input}/input_link_group={value}"
  params:
    - name: input
      type: integer
      description: Input 1-8 or 9-32 (matrix inputs)
    - name: value
      type: integer
      description: Link group ID (default '0' in source)

- id: set_device_input_isolate
  label: Set Device Input Isolate
  kind: action
  command: "/device/input/{input}/isolate={value}"
  params:
    - name: input
      type: integer
      description: Input 1-8
    - name: value
      type: enum
      values: [true, false]

- id: set_device_input_mode
  label: Set Device Input Mode
  kind: action
  command: "/device/input/{input}/mode={value}"
  params:
    - name: input
      type: integer
      description: Input 1-8 (mode default '1') or 9-32 (mode default '4')
    - name: value
      type: integer
      description: Input mode enum

- id: set_device_input_name
  label: Set Device Input Name
  kind: action
  command: "/device/input/{input}/name={value}"
  params:
    - name: input
      type: integer
      description: Input 1-8 (default A-H) or 9-32
    - name: value
      type: string
      description: Display name

- id: set_device_input_scale
  label: Set Device Input Scale
  kind: action
  command: "/device/input/{input}/scale={value}"
  params:
    - name: input
      type: integer
      description: Input 1-8
    - name: value
      type: integer
      description: Input scale (default '26' in source)

- id: set_device_input_select
  label: Set Device Input Select
  kind: action
  command: "/device/input/{input}/select={value}"
  params:
    - name: input
      type: integer
      description: Input 1-8 or 9-32
    - name: value
      type: enum
      values: [true, false]

- id: set_input_link_group_bypass
  label: Set Input Link Group Bypass
  kind: action
  command: "/device/input_link_group/{group}/bypass={value}"
  params:
    - name: group
      type: integer
      description: Link group 1-4
    - name: value
      type: enum
      values: [true, false]

- id: set_input_link_group_name
  label: Set Input Link Group Name
  kind: action
  command: "/device/input_link_group/{group}/name={value}"
  params:
    - name: group
      type: integer
      description: Link group 1-4
    - name: value
      type: string
      description: Link group name

- id: set_avb_controller_mode
  label: Set AVB Controller Mode
  kind: action
  command: "/device/input/avb/controller_mode={value}"
  params:
    - name: value
      type: integer
      description: AVB controller mode enum (default '0' in source)

- id: set_device_output_isolate
  label: Set Device Output Isolate
  kind: action
  command: "/device/output/{output}/isolate={value}"
  params:
    - name: output
      type: integer
      description: Output 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_device_output_mute_relay
  label: Set Device Output Mute Relay
  kind: action
  command: "/device/output/{output}/mute_relay={value}"
  params:
    - name: output
      type: integer
      description: Output 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_device_output_name
  label: Set Device Output Name
  kind: action
  command: "/device/output/{output}/name={value}"
  params:
    - name: output
      type: integer
      description: Output 1-16
    - name: value
      type: string
      description: Display name

- id: set_device_output_link_group
  label: Set Device Output Link Group
  kind: action
  command: "/device/output/{output}/output_link_group={value}"
  params:
    - name: output
      type: integer
      description: Output 1-16
    - name: value
      type: integer
      description: Output link group ID (default '0' in source)

- id: set_device_output_scale
  label: Set Device Output Scale
  kind: action
  command: "/device/output/{output}/scale={value}"
  params:
    - name: output
      type: integer
      description: Output 1-16
    - name: value
      type: integer
      description: Output scale (default '26' in source)

- id: set_device_output_select
  label: Set Device Output Select
  kind: action
  command: "/device/output/{output}/select={value}"
  params:
    - name: output
      type: integer
      description: Output 1-16
    - name: value
      type: enum
      values: [true, false]

- id: set_device_output_sim_trim
  label: Set Device Output SIM Trim
  kind: action
  command: "/device/output/{output}/sim/trim={value}"
  params:
    - name: output
      type: integer
      description: Output 1-16
    - name: value
      type: float
      description: SIM trim (default '0' in source)

- id: set_output_link_group_bypass
  label: Set Output Link Group Bypass
  kind: action
  command: "/device/output_link_group/{group}/bypass={value}"
  params:
    - name: group
      type: integer
      description: Output link group 1-8
    - name: value
      type: enum
      values: [true, false]

- id: set_output_link_group_name
  label: Set Output Link Group Name
  kind: action
  command: "/device/output_link_group/{group}/name={value}"
  params:
    - name: group
      type: integer
      description: Output link group 1-8
    - name: value
      type: string
      description: Link group name

- id: set_avb_presentation_time
  label: Set AVB Output Presentation Time
  kind: action
  command: "/device/output/avb/presentation_time={value}"
  params:
    - name: value
      type: integer
      description: Presentation time in nanoseconds (default '2000000' in source)

- id: set_output_atmospheric_altitude
  label: Set Output Atmospheric Altitude
  kind: action
  command: "/device/output/atmospheric/altitude={value}"
  params:
    - name: value
      type: float
      description: Altitude (units not stated; default '0' in source)

- id: set_output_atmospheric_humidity
  label: Set Output Atmospheric Humidity
  kind: action
  command: "/device/output/atmospheric/humidity={value}"
  params:
    - name: value
      type: float
      description: Humidity in % (default '50' in source)

- id: set_output_atmospheric_temperature
  label: Set Output Atmospheric Temperature
  kind: action
  command: "/device/output/atmospheric/temperature={value}"
  params:
    - name: value
      type: float
      description: Temperature in Kelvin (default '293.15' in source)

# --- Project / snapshot metadata ---

- id: set_project_name
  label: Set Project Name
  kind: action
  command: "/project/name={value}"
  params:
    - name: value
      type: string
      description: Project name (default 'Default' in source)

- id: set_boot_snapshot_id
  label: Set Boot Snapshot ID
  kind: action
  command: "/project/boot_snapshot_id={value}"
  params:
    - name: value
      type: integer
      description: Snapshot ID recalled at boot (default '3' in source)

- id: set_snapshot_name
  label: Set Snapshot Name
  kind: action
  command: "/project/snapshot/{id}/name={value}"
  params:
    - name: id
      type: integer
      description: Snapshot ID 0-255
    - name: value
      type: string
      description: Snapshot name

- id: set_snapshot_comment
  label: Set Snapshot Comment
  kind: action
  command: "/project/snapshot/{id}/comment={value}"
  params:
    - name: id
      type: integer
      description: Snapshot ID 0-255
    - name: value
      type: string
      description: Snapshot comment

- id: set_snapshot_locked
  label: Set Snapshot Locked
  kind: action
  command: "/project/snapshot/{id}/locked={value}"
  params:
    - name: id
      type: integer
      description: Snapshot ID 0-255
    - name: value
      type: enum
      values: [true, false]

# --- Regular-expression form (applies to all cp_set_value) ---

- id: set_mute_by_regex
  label: Set Mute by Regular Expression
  kind: action
  command: "/processing/{kind}/{regex}/mute={value}"
  ascii_hex_example: "2f 70 72 6f 63 65 73 73 69 6e 67 2f 6f 75 74 70 75 74 2f 28 5b 31 2d 39 5d 7c 31 5b 30 2d 36 5d 29 2f 6d 75 74 65 3d 31 0a"
  osc_example: "/processing/{kind}/{regex}/mute,T"
  params:
    - name: kind
      type: enum
      values: [input, output, "(in|out)put"]
    - name: regex
      type: string
      description: "POSIX-style regex (any char `.`, `*` wildcard, `\\d` digit, `\\d+` greedy digit) e.g. `\\d+`, `([1-9]|1[0-6])`"
    - name: value
      type: enum
      values: [true, false]
  notes: "Source documents 1/0 and T/F as accepted booleans on the wire."

# --- Status read paths (read-only; writing returns an error per source) ---

- id: get_firmware_status_string
  label: Get Firmware Status String
  kind: query
  command: "/system/firmware/status_string"
  params: []

- id: get_firmware_code
  label: Get Firmware Code
  kind: query
  command: "/system/firmware/code"
  params: []

- id: get_firmware_status
  label: Get Firmware Status
  kind: query
  command: "/system/firmware/status"
  params: []

- id: get_beam_control_input_source
  label: Get Beam Control Input Source
  kind: query
  command: "/status/beam_control_input_source"
  params: []

- id: get_clock_aes_output_input_number
  label: Get AES Output Clock Input Number
  kind: query
  command: "/status/clock/aes_output/input_number"
  params: []

- id: get_clock_aes_output_sample_rate
  label: Get AES Output Clock Sample Rate
  kind: query
  command: "/status/clock/aes_output/sample_rate"
  params: []

- id: get_clock_aes_output_source
  label: Get AES Output Clock Source
  kind: query
  command: "/status/clock/aes_output/source"
  params: []

- id: get_clock_aes_output_sync
  label: Get AES Output Clock Sync
  kind: query
  command: "/status/clock/aes_output/sync"
  params: []

- id: get_clock_gptp_status
  label: Get gPTP Clock Status
  kind: query
  command: "/status/clock/gptp/{port}/{field}"
  params:
    - name: port
      type: integer
      description: gPTP port 1-2
    - name: field
      type: enum
      values: [as_capable, grand_master_id, peer_delay, port_locked, port_role, as_path/trace_length]

- id: get_clock_input_status
  label: Get Input Clock Status
  kind: query
  command: "/status/clock/input/{input}/{field}"
  params:
    - name: input
      type: integer
      description: Clock input 1-32
    - name: field
      type: enum
      values: [sample_rate, sync]

- id: get_clock_rtc
  label: Get Real-Time Clock
  kind: query
  command: "/status/clock/rtc/date_and_time"
  params: []

- id: get_clock_system_status
  label: Get System Clock Status
  kind: query
  command: "/status/clock/system/{field}"
  params:
    - name: field
      type: enum
      values: [input_number, sample_rate, source, sync]

- id: get_clock_word_clock
  label: Get Word Clock Status
  kind: query
  command: "/status/clock/word_clock/{field}"
  params:
    - name: field
      type: enum
      values: [sync, termination]

- id: get_connected_client_counts
  label: Get Connected Client Counts
  kind: query
  command: "/status/{which}"
  params:
    - name: which
      type: enum
      values: [connected_client_count, connected_osc_tcp_client_count, connected_osc_udp_client_count, connected_text_tcp_client_count]

- id: get_hardware_board_status
  label: Get Hardware Board Status
  kind: query
  command: "/status/hardware/board/{board}/{field}"
  params:
    - name: board
      type: enum
      values: [digital, primary_io, secondary_io]
    - name: field
      type: string
      description: "Status field path; digital board exposes arm_temp, fan/{1-4}/{kickstarting,stalled,tach}, fpga_*_voltage, fpga_temp, main_5v0_voltage, vxco_pull, vcxo_sample_rate. primary_io/secondary_io expose analog_out_temp, i2c/*_present, trim/analog_in_ad/{1-4}/gain_comp|range_valid, trim/analog_out_da/{1-8}/gain_comp|range_valid."
  notes: "Substituting `secondary_io` for `primary_io` at the same path returns the secondary I/O board status per source."

- id: get_errors_exist
  label: Get Errors Exist Flag
  kind: query
  command: "/status/errors_exist"
  params: []

- id: get_identify_active
  label: Get Identify Active
  kind: query
  command: "/status/identify_active"
  params: []

- id: get_lcd_log_message
  label: Get LCD Log Message
  kind: query
  command: "/status/lcd_log_message"
  params: []

- id: get_led_status
  label: Get LED Status
  kind: query
  command: "/status/led/{which}"
  params:
    - name: which
      type: enum
      values: [avb_sync, media_clock, network, sim_bus]

- id: get_log_message
  label: Get Log Message
  kind: query
  command: "/status/log_message"
  params: []

- id: get_matrix_crosspoints_used
  label: Get Matrix Crosspoints Used
  kind: query
  command: "/status/matrix_crosspoints_used"
  params: []

- id: get_meter_input
  label: Get Input Meter
  kind: query
  command: "/status/meter/input/{input}"
  params:
    - name: input
      type: integer
      description: Input 1-8

- id: get_meter_input_split
  label: Get Input Split Meter
  kind: query
  command: "/status/meter/input_split/{input}"
  params:
    - name: input
      type: integer
      description: Input 1-8

- id: get_meter_line_mon
  label: Get Line Mon Meter
  kind: query
  command: "/status/meter/line_mon/{input}/{which}"
  params:
    - name: input
      type: integer
      description: Input 1-8
    - name: which
      type: enum
      values: [ideal, neg, pos]

- id: get_meter_matrix_input
  label: Get Matrix Input Meter
  kind: query
  command: "/status/meter/matrix_input/{input}"
  params:
    - name: input
      type: integer
      description: Matrix input 1-32

- id: get_meter_output
  label: Get Output Meter
  kind: query
  command: "/status/meter/output/{output}"
  params:
    - name: output
      type: integer
      description: Output 1-16

- id: get_meter_sim
  label: Get SIM Meter
  kind: query
  command: "/status/meter/sim/{channel}"
  params:
    - name: channel
      type: integer
      description: SIM channel 1-2

- id: get_model_string
  label: Get Model String
  kind: query
  command: "/status/model_string"
  params: []

- id: get_network_status
  label: Get Network Status
  kind: query
  command: "/status/network/{iface}/{field}"
  params:
    - name: iface
      type: integer
      description: Network interface 1-2
    - name: field
      type: enum
      values: [carrier, duplex, gateway, ip_address, mac_address, net_mask, speed]

- id: get_snapshot_recall_in_progress
  label: Get Snapshot Recall In Progress
  kind: query
  command: "/status/snapshot/recall_in_progress"
  params: []

- id: get_avb_clock_status
  label: Get AVB Clock Status
  kind: query
  command: "/status/avb/clock/{stream}/{role}/{field}"
  params:
    - name: stream
      type: integer
      description: AVB clock stream 1 (additional streams not enumerated in source)
    - name: role
      type: enum
      values: [connected_talker, listener, redundant_connected_talker, redundant-listener]
    - name: field
      type: string
      description: "Field such as channel_index, channel_name, connection_error, entity_id, entity_name, group_name, presentation_time, sample_rate, stream_format, stream_index, stream_name; listener/redundant-listener also expose early_timestamp_count, late_timestamp_count, media_locked, media_reset_count, msrp_accumulated_latency, presentation_time_margin, sequence_mismatch_count, stream_reset_count, timestamp_uncertain_count, unsupported_format_count."

- id: get_avb_input_status
  label: Get AVB Input Status
  kind: query
  command: "/status/avb/input/{input}/{role}/{field}"
  params:
    - name: input
      type: integer
      description: AVB input 1-32
    - name: role
      type: enum
      values: [connected_talker, listener, redundant_connected_talker, redundant-listener]
    - name: field
      type: string
      description: "Field as listed in Tables 19/20; `listener` and `redundant-listener` also expose media_locked and the timestamp/reset counters."

- id: get_entity
  label: Get Entity Identification
  kind: query
  command: "/entity/{field}"
  params:
    - name: field
      type: enum
      values: [entity_id, entity_model_id, entity_name, firmware_version, group_name, input_channel_count, input_stream_count, output_channel_count, output_stream_count, serial_number]
```

## Feedbacks
```yaml
# Observable states returned by the server. The /pong response is the only one
# explicitly documented as a discrete reply; all other state is read via
# cp_get_value on the corresponding control point.

- id: pong
  type: string
  description: "Response to :ping {keyword}. Sent only by the server; the client cannot send :pong. Carries the same keyword string that was sent in the ping."

- id: input_mute_state
  type: enum
  values: [true, false]
  description: "Returned by /processing/input/{n}/mute query (n=1-8)."

- id: input_gain_state
  type: float
  description: "Returned by /processing/input/{n}/gain query (n=1-8); -90 to 0 dB per source example."

- id: output_mute_state
  type: enum
  values: [true, false]
  description: "Returned by /processing/output/{n}/mute query (n=1-16)."

- id: output_gain_state
  type: float
  description: "Returned by /processing/output/{n}/gain query (n=1-16); -90 to 0 dB per source example."

- id: snapshot_active_id
  type: integer
  description: "Returned by /project/snapshot/active/id; '-1' when no snapshot selected per source."

- id: snapshot_recall_in_progress
  type: enum
  values: [true, false]
  description: "Returned by /status/snapshot/recall_in_progress."

- id: errors_exist
  type: enum
  values: [true, false]
  description: "Returned by /status/errors_exist."

- id: connected_client_count
  type: integer
  description: "Total number of clients currently connected to the control plane."

- id: connected_osc_tcp_client_count
  type: integer
  description: "OSC-over-TCP clients currently connected."

- id: connected_osc_udp_client_count
  type: integer
  description: "OSC-over-UDP clients currently connected."

- id: connected_text_tcp_client_count
  type: integer
  description: "ASCII (text) TCP clients currently connected."

- id: firmware_version
  type: string
  description: "Returned by /entity/firmware_version; default '2.1.0-R4-1907032112' in source."

- id: model_string
  type: string
  description: "Returned by /status/model_string; default 'GX-816' in source."

- id: log_message
  type: string
  description: "Formatted log line returned by /status/log_message."

- id: identify_active
  type: enum
  values: [true, false]
  description: "Returned by /status/identify_active."
```

## Variables
```yaml
# Settable parameters not represented as discrete actions above. Each
# control-point path is a settable address; the examples below are the
# non-action control points from the source tables.

- id: project_metadata_content_type
  path: /project/metadata/content_type
  type: integer
  default: "2"
  description: Content type metadata for the loaded project.

- id: project_metadata_schema_version
  path: /project/metadata/schema_version
  type: integer
  default: "10"
  description: Project metadata schema version.

- id: project_firmware_version
  path: /project/project_firmware_version
  type: string
  default: "none"
  description: Firmware version the project was authored against.

- id: entity_entity_id
  path: /entity/entity_id
  type: string
  description: AVB/MAAP entity ID; unique per device. Default '0x1cabfffe008d80' in source.
  writable: false
  notes: "Source marks this under Entity settings but does not declare it read-only explicitly; included as a status-like variable pending real-device confirmation."

- id: entity_entity_model_id
  path: /entity/entity_model_id
  type: string
  description: Device model ID. Default '0x1cabb804004005' in source.

- id: entity_entity_name
  path: /entity/entity_name
  type: string
  description: Device entity name. Default 'GALAXY-18139889' in source.

- id: entity_group_name
  path: /entity/group_name
  type: string
  description: Group name the device belongs to. Default 'GALAXYs' in source.

- id: entity_serial_number
  path: /entity/serial_number
  type: string
  description: Device serial number. Default '18139889' in source.

- id: entity_input_channel_count
  path: /entity/input_channel_count
  type: integer
  default: "64"

- id: entity_input_stream_count
  path: /entity/input_stream_count
  type: integer
  default: "18"

- id: entity_output_channel_count
  path: /entity/output_channel_count
  type: integer
  default: "24"

- id: entity_output_stream_count
  path: /entity/output_stream_count
  type: integer
  default: "14"

- id: matrix_crosspoints_used
  path: /status/matrix_crosspoints_used
  type: integer
  description: "Number of matrix cross-points currently in use (default '16' in source). Read-only."
  writable: false
```

## Events
```yaml
# The control plane only emits unsolicited messages in response to subscriptions
# (cp_subscribe). There is no event stream in the source beyond the subscription
# push mechanism.
- id: subscribed_value_push
  description: "After a client subscribes via cp_subscribe, the server pushes the current value of each subscribed control point at the requested interval, and on every change of value while the subscription is active. For UDP, the subscription expires after 30 seconds of client silence; resend a /ping to keep alive. For TCP, the subscription persists until cp_unsubscribe or the TCP connection drops."
  trigger: subscription_update
  transport: [tcp, udp]
```

## Macros
```yaml
# Multi-step sequences that the source documents as a single logical operation.
# The recall_snapshot exclusion argument is documented as a single command
# (not a macro) so it is represented in recall_snapshot's params, not here.

# UNRESOLVED: source does not document any higher-level multi-step macros
# (e.g. "save project", "reboot into snapshot N"). Remove this section if
# none are added after real-device verification.
[]  # UNRESOLVED: no multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or
# power-on sequencing requirements. The snapshot recall command can
# immediately change live audio routing/levels, but no explicit safety
# procedure is stated. Do not infer.
```

## Notes
- The control plane listens on both ASCII (port 25003) and OSC (port 25004) simultaneously for the same physical device. ASCII uses CR/LF-terminated text; OSC uses 4-byte length-prefixed packets on TCP and unprefixed datagrams on UDP.
- Telnet is unavailable on current macOS; use `nc` per the source. mDNS names follow `mslg-gx-{408|816|816aes|bluehorn}-{serial}.local` or `Entity.Group.local`.
- Virtual GALAXY instances are port-shifted: in Normal mode ASCII starts at 50503 (OSC 50504) and decrements by 100 per additional virtual; in Spacemap mode both start at 25003/25004 and increment by 100 per additional virtual.
- Subscribe/unsubscribe apply the same syntax to all control points; the path may contain regular-expression tokens (`.`, `*`, `\d`, `\d+`, character classes) to address many points in one command. Maximum 232 matrix cross-points may be set simultaneously.
- Boolean values accept both `true`/`false`, `T`/`F`, and integer 1/0; the server type-casts positive non-zero integers to True per the source.
- Status control points (`/status/...`) are read-only — setting them returns an error.
- Default values shown in the source tables (e.g. EQ center frequencies, link-group IDs, network settings) are GALAXY-816 representative; other models may differ.

<!-- UNRESOLVED: firmware version requirements for the control-plane server are not stated; some control point default values may differ across GALAXY 408 / 816 / 816-AES / Bluehorn variants. The "Additional documents" row that appears inside the input-EQ table (line 593 of the source) appears to be a markdown extraction artifact rather than a real control point and has been omitted. -->

## Provenance

```yaml
source_domains:
  - docs.meyersound.com
  - applicationmarket.crestron.com
source_urls:
  - https://docs.meyersound.com/products/en/programming-guide---galileo-galaxy.html
  - https://docs.meyersound.com/products/en/user-guide---galileo-galaxy.html
  - https://applicationmarket.crestron.com/meyer-sound-galileo/
retrieved_at: 2026-04-26T18:21:57.350Z
last_checked_at: 2026-06-02T17:23:31.251Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:31.251Z
matched_actions: 134
action_count: 134
confidence: medium
summary: "All 134 spec actions match verbatim control-point paths in the source tables; transport ports 25003/25004/50503/50504 are confirmed in Table 1. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "/project/snapshot/{id}/created"
- "/project/snapshot/{id}/last_updated"
- "/project/snapshot/{id}/modified"
- /project/snapshot/active/comment
- /project/snapshot/active/created
- /project/snapshot/active/last_updated
- /project/snapshot/active/locked
- /project/snapshot/active/modified
- /project/snapshot/active/name
- "Spacemap-mode control points not enumerated in source; firmware version requirements for the control plane are not specified."
- "source does not document any higher-level multi-step macros"
- "no multi-step macro sequences in source"
- "source does not document safety warnings, interlocks, or"
- "firmware version requirements for the control-plane server are not stated; some control point default values may differ across GALAXY 408 / 816 / 816-AES / Bluehorn variants. The \"Additional documents\" row that appears inside the input-EQ table (line 593 of the source) appears to be a markdown extraction artifact rather than a real control point and has been omitted."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
